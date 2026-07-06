import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StarRating from '../shared/StarRating';
import Badge from '../shared/Badge';
import PropTypes from 'prop-types';

// Fix default Leaflet icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom HTML marker maker
const makeIcon = (pool, isSelected) =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        background: ${pool.color || '#00c4cc'};
        color: #fff;
        border-radius: 20px 20px 20px 4px;
        padding: 5px 9px;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: ${isSelected ? '0 0 16px ' + (pool.color || '#00c4cc') : '0 3px 14px rgba(0,0,0,0.5)'};
        border: ${isSelected ? '2px solid #fff' : '2px solid rgba(255,255,255,0.25)'};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        cursor: pointer;
        transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        <span>${pool.priceDisplay}</span>
        <span style="opacity:0.85; font-size:9px;">${'★'.repeat(Math.round(pool.rating))} ${pool.type.split(' ')[0]}</span>
      </div>`,
    iconSize: [90, 42],
    iconAnchor: [20, 42],
    popupAnchor: [25, -46],
  });

// Component to fly map viewport to selected hovered marker
const FitBounds = ({ pools: poolList }) => {
  const map = useMap();
  useEffect(() => {
    if (poolList.length > 0) {
      const bounds = poolList.map((p) => [p.lat, p.lng]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [poolList, map]);
  return null;
};
FitBounds.propTypes = { pools: PropTypes.array.isRequired };

// Component to fit bounds to all pool markers when the search list changes
const FitMapToPools = ({ poolList }) => {
  const map = useMap();
  useEffect(() => {
    if (poolList && poolList.length > 0) {
      const bounds = poolList.map((p) => [p.lat, p.lng]);
      // If only one pool, set map center directly to avoid extreme zoom in
      if (bounds.length === 1) {
        map.setView(bounds[0], 13);
      } else {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [poolList, map]);
  return null;
};
FitMapToPools.propTypes = { poolList: PropTypes.array.isRequired };

const MapView = ({ selectedId, onSelect, poolList = [] }) => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <MapContainer
      center={[20.0, 0.0]}
      zoom={2}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {poolList.map((pool) => (
        <Marker
          key={pool.id}
          position={[pool.lat, pool.lng]}
          icon={makeIcon(pool, pool.id === selectedId)}
          eventHandlers={{
            click: () => onSelect && onSelect(pool.id),
            mouseover: () => setHoveredId(pool.id),
            mouseout: () => setHoveredId(null),
          }}
        >
          <Popup>
            <div style={{ minWidth: 200 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <Badge type={pool.type} />
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: pool.isOpenNow ? '#22d37a' : '#f06060',
                    fontWeight: 700,
                  }}
                >
                  {pool.isOpenNow ? '● Open' : '● Closed'}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#e8f0fe',
                  marginBottom: 4,
                }}
              >
                {pool.name}
              </h3>
              <StarRating rating={pool.rating} size="sm" />
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#8ba4c8',
                  margin: '6px 0',
                }}
              >
                {pool.address.split(',')[0]}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: '#00c4cc',
                    fontSize: '0.9rem',
                  }}
                >
                  {pool.priceDisplay}
                </span>
                <button
                  onClick={() => navigate(`/pool/${pool.id}`)}
                  style={{
                    background: 'linear-gradient(135deg, #00c4cc, #1a78ff)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 20,
                    padding: '5px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  View →
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Auto zoom/pan map to match pools when they search a new location */}
      <FitMapToPools poolList={poolList} />

      {hoveredId && (
        <FitBounds
          pools={[poolList.find((p) => p.id === hoveredId)].filter(Boolean)}
        />
      )}
    </MapContainer>
  );
};

MapView.propTypes = {
  selectedId: PropTypes.number,
  onSelect: PropTypes.func,
  poolList: PropTypes.array,
};
export default MapView;
