import { useState, useMemo } from 'react';
import { filterPools } from '../data/pools';

const defaultFilters = {
  query: '',
  types: [],
  features: [],
  activities: [],
  amenities: [],
  pricingTypes: [],
  openNow: false,
  sortBy: 'distance',
};

export const usePoolSearch = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...initialFilters,
  });

  const results = useMemo(() => filterPools(filters), [filters]);

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

  return {
    filters,
    results,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    activeFilterCount,
  };
};
