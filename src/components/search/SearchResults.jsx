import PropTypes from 'prop-types';
import PoolCard from '../shared/PoolCard';
import EmptyState from '../shared/EmptyState';
import SortDropdown from './SortDropdown';

const SearchResults = ({
  results,
  total,
  filters,
  updateFilter,
  resetFilters,
}) => (
  <div style={{ flex: 1 }}>
    {/* Results header */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <span
          style={{
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontSize: '1rem',
          }}
        >
          {results.length}
        </span>{' '}
        of {total} pools found
        {filters.query && (
          <span>
            {' '}
            for{' '}
            <em style={{ color: 'var(--accent-cyan)' }}>
              &quot;{filters.query}&quot;
            </em>
          </span>
        )}
      </p>
      <SortDropdown
        value={filters.sortBy}
        onChange={(v) => updateFilter('sortBy', v)}
      />
    </div>

    {results.length === 0 ? (
      <EmptyState onReset={resetFilters} />
    ) : (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 22,
        }}
      >
        {results.map((pool, i) => (
          <div
            key={pool.id}
            style={{ animation: `fadeInUp 0.4s ease ${i * 0.06}s both` }}
          >
            <PoolCard pool={pool} />
          </div>
        ))}
      </div>
    )}
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
export default SearchResults;
