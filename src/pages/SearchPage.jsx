import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchSidebar from '../components/search/SearchSidebar';
import SearchResults from '../components/search/SearchResults';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { usePoolSearchContext } from '../context/PoolSearchContext';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [locQuery, setLocQuery] = useState(searchParams.get('q') || '');

  const {
    filters,
    results,
    pools,
    loading,
    error,
    searchName,
    searchLocation,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    activeFilterCount,
  } = usePoolSearchContext();

  // Sync URL query param on mount and when it changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setLocQuery(q); // eslint-disable-line react-hooks/set-state-in-effect
    searchLocation(q);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocationSearch = (e) => {
    e.preventDefault();
    setSearchParams(locQuery ? { q: locQuery } : {});
  };

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        {/* Search header bar */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '20px 0',
            position: 'sticky',
            top: 'var(--navbar-height)',
            zIndex: 100,
            boxShadow: '0 2px 16px rgba(0, 100, 160, 0.08)',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Location Input Form */}
              <form
                onSubmit={handleLocationSearch}
                style={{ display: 'flex', gap: 10, flex: 1, minWidth: 280 }}
              >
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'var(--bg-glass)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)' }}>📍</span>
                  <input
                    type="text"
                    placeholder="Enter city, country or zip code..."
                    value={locQuery}
                    onChange={(e) => setLocQuery(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      width: '100%',
                    }}
                  />
                  {locQuery && (
                    <button
                      type="button"
                      onClick={() => setLocQuery('')}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '0 22px',
                  }}
                >
                  Search Area
                </button>
              </form>

              {/* Text Search filter (client-side) */}
              <div
                style={{
                  width: 260,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--bg-glass)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 16px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Filter by pool name..."
                  value={filters.query}
                  onChange={(e) => updateFilter('query', e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    width: '100%',
                  }}
                />
                {filters.query && (
                  <button
                    onClick={() => updateFilter('query', '')}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSidebarOpen((o) => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                ⚙️ Filters{' '}
                {activeFilterCount > 0 && (
                  <span
                    style={{
                      background: 'var(--accent-cyan)',
                      color: '#000',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                    }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '80%',
                maxWidth: 360,
                background: 'var(--bg-secondary)',
                overflowY: 'auto',
                animation: 'fadeInUp 0.25s ease',
                padding: 16,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchSidebar
                filters={filters}
                toggleArrayFilter={toggleArrayFilter}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>
        )}

        {/* Main layout: sidebar + results */}
        <div
          className="container"
          style={{
            padding: '32px 24px 80px',
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* Desktop sidebar */}
          <div style={{ display: 'block' }} className="search-sidebar-desktop">
            <SearchSidebar
              filters={filters}
              toggleArrayFilter={toggleArrayFilter}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Results Area */}
          <div style={{ flex: 1 }}>
            {error && (
              <div
                style={{
                  background: 'rgba(240, 96, 96, 0.1)',
                  border: '1px solid rgba(240, 96, 96, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  color: '#f06060',
                  fontSize: '0.88rem',
                  marginBottom: 24,
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Location Scope:
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700,
                }}
              >
                {searchName}
              </span>
            </div>

            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '80px 0',
                }}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <SearchResults
                results={results}
                total={pools.length}
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
              />
            )}
          </div>
        </div>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr !important; }
          .search-sidebar-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default SearchPage;
