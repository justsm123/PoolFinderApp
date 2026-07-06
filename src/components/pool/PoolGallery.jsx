import PropTypes from 'prop-types';

// SVG pool gallery placeholders with pool-themed gradients
const GalleryItem = ({ gradient, label, icon, span = false }) => (
  <div
    style={{
      background: gradient,
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      gridColumn: span ? 'span 2' : 'span 1',
      minHeight: span ? 220 : 160,
      border: '1px solid rgba(255,255,255,0.08)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'var(--transition)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = 'brightness(1.12)';
      e.currentTarget.style.transform = 'scale(1.01)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = 'brightness(1)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {/* Water ripple decoration */}
    <div
      style={{
        position: 'absolute',
        bottom: -20,
        left: -20,
        right: -20,
        height: 80,
        background:
          'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)',
      }}
    />
    <span
      style={{
        fontSize: '2.5rem',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
      }}
    >
      {icon}
    </span>
    <span
      style={{
        fontSize: '0.78rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  </div>
);
GalleryItem.propTypes = {
  gradient: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  span: PropTypes.bool,
};

const galleryItems = [
  {
    gradient: 'linear-gradient(135deg,#0f4c81,#1a7a8a)',
    label: 'Main Pool',
    icon: '🏊',
    span: true,
  },
  {
    gradient: 'linear-gradient(135deg,#1a237e,#283593)',
    label: 'Lap Lanes',
    icon: '🔵',
  },
  {
    gradient: 'linear-gradient(135deg,#006064,#00838f)',
    label: 'Pool Deck',
    icon: '☀️',
  },
  {
    gradient: 'linear-gradient(135deg,#33691e,#558b2f)',
    label: 'Locker Room',
    icon: '🚿',
  },
  {
    gradient: 'linear-gradient(135deg,#4a148c,#6a1b9a)',
    label: 'Amenities',
    icon: '🎽',
  },
];

const PoolGallery = ({ pool }) => (
  <div>
    <h2
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.3rem',
        fontWeight: 700,
        marginBottom: 16,
        color: 'var(--text-primary)',
      }}
    >
      📸 Photos
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto auto',
        gap: 10,
      }}
    >
      {galleryItems.map((item, i) => (
        <GalleryItem
          key={i}
          gradient={item.gradient || pool.gradient}
          label={item.label}
          icon={item.icon}
          span={item.span}
        />
      ))}
    </div>
    <p
      style={{
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        marginTop: 10,
        textAlign: 'center',
      }}
    >
      Photos are representative of {pool.name}
    </p>
  </div>
);
PoolGallery.propTypes = { pool: PropTypes.object.isRequired };
export default PoolGallery;
