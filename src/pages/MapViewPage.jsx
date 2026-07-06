import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MapView from '../components/map/MapView';
import Badge from '../components/shared/Badge';
import StarRating from '../components/shared/StarRating';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { usePoolSearchContext } from '../context/PoolSearchContext';

const MapViewPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const { results, loading, searchName, searchLocation } =
    usePoolSearchContext();

  const [locQuery, setLocQuery] = useState('');

  // Sync locQuery when searchName changes
  useEffect(() => {
    if (searchName && searchName !== 'Global Discovery') {
      setLocQuery(searchName); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [searchName]);

  const handleLocationSearch = (e) => {
    e.preventDefault();
    searchLocation(locQuery);
  };

  const selected = results.find((p) => p.id === selectedId);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - var(--navbar-height))',
          marginTop: 'var(--navbar-height)',
        }}
      >
        {/* Left panel */}
        <div
          style={{
            width: 340,
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: '20px 20px 16px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 12,
              }}
            >
              🗺️ Pool Map
            </h2>

            {/* Quick location search */}
            <form
              onSubmit={handleLocationSearch}
              style={{ display: 'flex', gap: 6, marginBottom: 12 }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-glass)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px 10px',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>📍</span>
                <input
                  type="text"
                  placeholder="Enter city or zip..."
                  value={locQuery}
                  onChange={(e) => setLocQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    width: '100%',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{
                  padding: '0 12px',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Go
              </button>
            </form>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {results.length} pools in{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 650 }}>
                {searchName}
              </span>
            </p>
          </div>

          {/* Pool list */}
          <div
            style={{
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 0',
                }}
              >
                <LoadingSpinner />
              </div>
            ) : results.length === 0 ? (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                }}
              >
                No pools found in this area. Try searching another location.
              </div>
            ) : (
              results.map((pool) => (
                <div
                  key={pool.id}
                  onClick={() =>
                    setSelectedId(pool.id === selectedId ? null : pool.id)
                  }
                  style={{
                    padding: '14px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border)',
                    background:
                      selectedId === pool.id
                        ? 'rgba(0,196,204,0.08)'
                        : 'transparent',
                    borderLeft: `3px solid ${selectedId === pool.id ? 'var(--accent-cyan)' : 'transparent'}`,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedId !== pool.id)
                      e.currentTarget.style.background = 'var(--bg-glass)';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedId !== pool.id)
                      e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}
                    >
                      {pool.name}
                    </div>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan)',
                        flexShrink: 0,
                      }}
                    >
                      {pool.priceDisplay}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Badge type={pool.type} />
                    <StarRating
                      rating={pool.rating}
                      size="sm"
                      showNumber={false}
                    />
                    {pool.distance > 0 && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {pool.distance} mi
                      </span>
                    )}
                    <span
                      className={pool.isOpenNow ? 'open-badge' : 'closed-badge'}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {pool.isOpenNow ? '● Open' : '● Closed'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Selected pool detail panel */}
          {selected && !loading && (
            <div
              style={{
                borderTop: '1px solid var(--border-accent)',
                padding: '16px 20px',
                background: 'rgba(0,196,204,0.06)',
                animation: 'fadeInUp 0.2s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <div style={{ maxWidth: '70%' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {selected.name}
                  </div>
                  <StarRating rating={selected.rating} size="sm" />
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {selected.priceDisplay}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {selected.description.slice(0, 100)}...
              </p>
              <button
                className="btn btn-primary btn-sm"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                }}
                onClick={() => navigate(`/pool/${selected.id}`)}
              >
                View Full Details →
              </button>
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative' }}>
          {loading ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <MapView
              selectedId={selectedId}
              onSelect={setSelectedId}
              poolList={results}
            />
          )}

          {/* Map attribution hint */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            Click a marker to see details
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="width: 340px"] { width: 100% !important; height: 40% !important; }
          div[style*="flex: 1"][style*="position: relative"] { height: 60% !important; }
          div[style*="display: flex"][style*="calc(100vh"] { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
};

export default MapViewPage;
