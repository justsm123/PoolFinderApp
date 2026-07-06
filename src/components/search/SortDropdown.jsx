import PropTypes from 'prop-types';

const SORT_OPTIONS = [
  { value: 'distance', label: '📏 Distance' },
  { value: 'rating', label: '⭐ Rating' },
  { value: 'price_asc', label: '💰 Price: Low to High' },
  { value: 'price_desc', label: '💰 Price: High to Low' },
];

const SortDropdown = ({ value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span
      style={{
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      Sort by:
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 12px',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'var(--transition)',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'var(--accent-cyan)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'var(--border)';
      }}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

SortDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default SortDropdown;
