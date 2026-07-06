import PropTypes from 'prop-types';
import {
  POOL_TYPES,
  FEATURES,
  ACTIVITIES,
  AMENITIES_LIST,
  PRICING_TYPES,
} from '../../data/pools';

const FilterSection = ({ title, items, selectedItems, onToggle }) => (
  <div style={{ marginBottom: 24 }}>
    <p
      style={{
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--text-muted)',
        marginBottom: 12,
      }}
    >
      {title}
    </p>
    <div className="checkbox-group">
      {items.map((item) => (
        <label key={item} className="checkbox-item">
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => onToggle(item)}
          />
          {item}
        </label>
      ))}
    </div>
  </div>
);
FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const SearchSidebar = ({
  filters,
  toggleArrayFilter,
  updateFilter,
  resetFilters,
  activeFilterCount,
}) => (
  <aside
    style={{
      background: 'var(--bg-card)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      position: 'sticky',
      top: 'calc(var(--navbar-height) + 16px)',
      maxHeight: 'calc(100vh - var(--navbar-height) - 32px)',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
    }}
  >
    {/* Sidebar header */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: 700,
          }}
        >
          Filters
        </h2>
        {activeFilterCount > 0 && (
          <span
            style={{
              background: 'var(--accent-cyan)',
              color: '#000',
              borderRadius: 'var(--radius-full)',
              width: 20,
              height: 20,
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
      </div>
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          style={{
            fontSize: '0.78rem',
            color: 'var(--accent-cyan)',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Clear all
        </button>
      )}
    </div>

    <hr className="divider" />

    {/* Open now toggle */}
    <div style={{ marginBottom: 24 }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          Open Now
        </span>
        <div
          onClick={() => updateFilter('openNow', !filters.openNow)}
          style={{
            width: 42,
            height: 24,
            background: filters.openNow
              ? 'var(--accent-cyan)'
              : 'var(--border)',
            borderRadius: 'var(--radius-full)',
            position: 'relative',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 3,
              left: filters.openNow ? 21 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              transition: 'var(--transition)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </label>
    </div>

    <hr className="divider" />

    <FilterSection
      title="Pool Type"
      items={POOL_TYPES}
      selectedItems={filters.types}
      onToggle={(v) => toggleArrayFilter('types', v)}
    />

    <hr className="divider" />

    <FilterSection
      title="Features"
      items={FEATURES}
      selectedItems={filters.features}
      onToggle={(v) => toggleArrayFilter('features', v)}
    />

    <hr className="divider" />

    <FilterSection
      title="Activities"
      items={ACTIVITIES}
      selectedItems={filters.activities}
      onToggle={(v) => toggleArrayFilter('activities', v)}
    />

    <hr className="divider" />

    <FilterSection
      title="Amenities"
      items={AMENITIES_LIST}
      selectedItems={filters.amenities}
      onToggle={(v) => toggleArrayFilter('amenities', v)}
    />

    <hr className="divider" />

    <FilterSection
      title="Pricing"
      items={PRICING_TYPES}
      selectedItems={filters.pricingTypes}
      onToggle={(v) => toggleArrayFilter('pricingTypes', v)}
    />
  </aside>
);

SearchSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  toggleArrayFilter: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  activeFilterCount: PropTypes.number.isRequired,
};
export default SearchSidebar;
