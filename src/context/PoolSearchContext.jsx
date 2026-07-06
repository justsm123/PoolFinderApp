import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { parseOSMPool } from '../utils/poolParser';
import { pools as mockPools } from '../data/pools';

const PoolSearchContext = createContext(null);

const defaultFilters = {
  query: '',
  types: [],
  features: [],
  activities: [],
  amenities: [],
  pricingTypes: [],
  openNow: false,
  sortBy: 'rating', // Default to rating for global, can switch to distance on local search
};

export const PoolSearchProvider = ({ children }) => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCenter, setSearchCenter] = useState(null);
  const [searchName, setSearchName] = useState('Global Discovery');
  const [filters, setFilters] = useState(defaultFilters);

  // Helper to fetch pools from Overpass API
  const fetchOverpassPools = async (queryQL, centerLat, centerLng) => {
    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: queryQL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve pool data from OpenStreetMap.');
      }

      const data = await response.json();
      const elements = data.elements || [];

      const parsed = elements
        .map((el) => parseOSMPool(el, centerLat, centerLng))
        .filter(Boolean);

      return parsed;
    } catch (err) {
      console.error('Overpass API error:', err);
      throw err;
    }
  };

  // Search pools globally
  const searchGlobal = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSearchCenter(null);
    setSearchName('Global Discovery');

    const globalQL = `
      [out:json][timeout:25];
      (
        node["leisure"="swimming_pool"](around:20000, 40.7128, -74.0060); // NY
        way["leisure"="swimming_pool"](around:20000, 40.7128, -74.0060);
        node["leisure"="swimming_pool"](around:20000, 51.5074, -0.1278); // London
        way["leisure"="swimming_pool"](around:20000, 51.5074, -0.1278);
        node["leisure"="swimming_pool"](around:20000, 48.8566, 2.3522);  // Paris
        way["leisure"="swimming_pool"](around:20000, 48.8566, 2.3522);
        node["leisure"="swimming_pool"](around:20000, -33.8688, 151.2093); // Sydney
        way["leisure"="swimming_pool"](around:20000, -33.8688, 151.2093);
        node["leisure"="swimming_pool"](around:20000, 35.6762, 139.6503); // Tokyo
        way["leisure"="swimming_pool"](around:20000, 35.6762, 139.6503);
        node["leisure"="swimming_pool"](around:20000, 33.7490, -84.3880); // Atlanta
        way["leisure"="swimming_pool"](around:20000, 33.7490, -84.3880);
      );
      out center 150;
    `;

    try {
      const results = await fetchOverpassPools(globalQL, null, null);
      if (results.length === 0) {
        // Fallback to mock pools if no results
        setPools(mockPools);
      } else {
        setPools(results);
      }
    } catch (err) {
      console.warn('Falling back to local mock data due to API error:', err);
      setPools(mockPools);
      setError('Live API lookup failed. Displaying featured fallback pools.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Search by location string (city, zip code, etc.)
  const searchLocation = useCallback(
    async (locationQuery) => {
      if (!locationQuery || !locationQuery.trim()) {
        return searchGlobal();
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Geocode with Nominatim API
        const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&limit=1`;
        const geoResponse = await fetch(geoUrl, {
          headers: {
            'User-Agent': 'PoolFinderApp/1.0 (sanjith.manikandan@outlook.com)',
          },
        });

        if (!geoResponse.ok) {
          throw new Error('Geocoding service unavailable.');
        }

        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) {
          throw new Error(
            `Location "${locationQuery}" not found. Please try a different city, country or zip code.`,
          );
        }

        const { lat, lon, display_name } = geoData[0];
        const centerLat = parseFloat(lat);
        const centerLng = parseFloat(lon);

        // Shorten display name to first two segments (e.g. "Atlanta, Georgia")
        const shortName = display_name
          .split(',')
          .slice(0, 2)
          .map((s) => s.trim())
          .join(', ');
        setSearchCenter({ lat: centerLat, lng: centerLng });
        setSearchName(shortName);

        // 2. Query Overpass for pools within 25km radius
        const searchQL = `
        [out:json][timeout:30];
        (
          node["leisure"="swimming_pool"](around:25000, ${centerLat}, ${centerLng});
          way["leisure"="swimming_pool"](around:25000, ${centerLat}, ${centerLng});
        );
        out center 120;
      `;

        const results = await fetchOverpassPools(
          searchQL,
          centerLat,
          centerLng,
        );
        setPools(results);

        // Auto-switch sort to distance when we have a search center
        setFilters((prev) => ({ ...prev, sortBy: 'distance' }));
      } catch (err) {
        setError(err.message || 'An error occurred during search.');
        setPools([]);
      } finally {
        setLoading(false);
      }
    },
    [searchGlobal],
  );

  // Search by specific coordinates (browser geolocation)
  const searchCoordinates = useCallback(
    async (lat, lng, name = 'My Location') => {
      setLoading(true);
      setError(null);
      setSearchCenter({ lat, lng });
      setSearchName(name);

      const geoQL = `
      [out:json][timeout:30];
      (
        node["leisure"="swimming_pool"](around:25000, ${lat}, ${lng});
        way["leisure"="swimming_pool"](around:25000, ${lat}, ${lng});
      );
      out center 120;
    `;

      try {
        const results = await fetchOverpassPools(geoQL, lat, lng);
        setPools(results);
        setFilters((prev) => ({ ...prev, sortBy: 'distance' }));
      } catch (err) {
        console.error('Failed to load pools around location:', err);
        setError('Failed to load pools around your location.');
        setPools([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Fetch a single pool by OSM ID directly (supports page reloads / deep linking)
  const fetchPoolById = useCallback(
    async (osmId) => {
      // Check if we already have it in local state
      const existing = pools.find((p) => String(p.id) === String(osmId));
      if (existing) return existing;

      // Check in fallback mock pools
      const mockMatch = mockPools.find((p) => String(p.id) === String(osmId));
      if (mockMatch) return mockMatch;

      // Fetch from Overpass API
      const singleQL = `
      [out:json][timeout:15];
      (
        node(${osmId});
        way(${osmId});
      );
      out center;
    `;

      try {
        const response = await fetch(
          'https://overpass-api.de/api/interpreter',
          {
            method: 'POST',
            body: singleQL,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        if (!response.ok) return null;
        const data = await response.json();
        const elements = data.elements || [];
        if (elements.length === 0) return null;

        return parseOSMPool(elements[0], null, null);
      } catch (err) {
        console.error('Failed to load single pool:', err);
        return null;
      }
    },
    [pools],
  );

  // Apply filters and sorting on client-side
  const results = useMemo(() => {
    let list = [...pools];

    // Filter by name/description text
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Filter by types
    if (filters.types.length > 0) {
      list = list.filter((p) => filters.types.includes(p.type));
    }

    // Filter by features
    if (filters.features.length > 0) {
      list = list.filter((p) =>
        filters.features.every((f) => p.features.includes(f)),
      );
    }

    // Filter by activities
    if (filters.activities.length > 0) {
      list = list.filter((p) =>
        filters.activities.every((a) => p.activities.includes(a)),
      );
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      list = list.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a)),
      );
    }

    // Filter by pricing types
    if (filters.pricingTypes.length > 0) {
      list = list.filter((p) => filters.pricingTypes.includes(p.priceType));
    }

    // Filter by open state
    if (filters.openNow) {
      list = list.filter((p) => p.isOpenNow);
    }

    // Sort list
    switch (filters.sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'distance':
      default:
        // Distance sort makes sense only if we have search center, else keep original OSM order or rating
        if (searchCenter) {
          list.sort((a, b) => a.distance - b.distance);
        } else {
          list.sort((a, b) => b.rating - a.rating);
        }
        break;
    }

    return list;
  }, [pools, filters, searchCenter]);

  // Load global pools on initial mount
  useEffect(() => {
    searchGlobal();
  }, [searchGlobal]);

  // Update filters handlers
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: updated };
    });
  };

  const resetFilters = () => setFilters(defaultFilters);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.types.length) count += filters.types.length;
    if (filters.features.length) count += filters.features.length;
    if (filters.activities.length) count += filters.activities.length;
    if (filters.amenities.length) count += filters.amenities.length;
    if (filters.pricingTypes.length) count += filters.pricingTypes.length;
    if (filters.openNow) count += 1;
    return count;
  }, [filters]);

  return (
    <PoolSearchContext.Provider
      value={{
        pools,
        loading,
        error,
        searchCenter,
        searchName,
        filters,
        results,
        searchGlobal,
        searchLocation,
        searchCoordinates,
        fetchPoolById,
        updateFilter,
        toggleArrayFilter,
        resetFilters,
        activeFilterCount,
      }}
    >
      {children}
    </PoolSearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePoolSearchContext = () => {
  const context = useContext(PoolSearchContext);
  if (!context) {
    throw new Error(
      'usePoolSearchContext must be used within a PoolSearchProvider',
    );
  }
  return context;
};
