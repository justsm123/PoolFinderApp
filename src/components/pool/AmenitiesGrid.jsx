import PropTypes from 'prop-types';

const amenityConfig = {
  Showers: { icon: '🚿', color: 'rgba(0,196,204,0.12)' },
  Lockers: { icon: '🔒', color: 'rgba(26,120,255,0.12)' },
  Parking: { icon: '🅿️', color: 'rgba(100,180,0,0.12)' },
  'Wi-Fi': { icon: '📶', color: 'rgba(220,130,0,0.12)' },
  Lifeguards: { icon: '🛟', color: 'rgba(220,60,60,0.12)' },
  'Wheelchair Access': { icon: '♿', color: 'rgba(110,100,220,0.12)' },
  'Snack Bar': { icon: '🍦', color: 'rgba(220,80,150,0.12)' },
  'Pro Shop': { icon: '🏪', color: 'rgba(0,196,100,0.12)' },
};

const AmenitiesGrid = ({ amenities }) => (
  <div className="glass-card" style={{ padding: 24 }}>
    <h3
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.1rem',
        fontWeight: 700,
        marginBottom: 18,
        color: 'var(--text-primary)',
      }}
    >
      🎽 Amenities
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 12,
      }}
    >
      {amenities.map((a) => {
        const cfg = amenityConfig[a] || {
          icon: '✓',
          color: 'rgba(0,196,204,0.12)',
        };
        return (
          <div
            key={a}
            style={{
              background: cfg.color,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{cfg.icon}</span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textAlign: 'center',
              }}
            >
              {a}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
AmenitiesGrid.propTypes = { amenities: PropTypes.array.isRequired };
export default AmenitiesGrid;
