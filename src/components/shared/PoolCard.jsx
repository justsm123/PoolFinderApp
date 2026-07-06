import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from './Badge';
import StarRating from './StarRating';

const featureIcons = {
  Indoor: '🏠',
  Outdoor: '☀️',
  Heated: '🔥',
  Saltwater: '🌊',
  'Lap Lanes': '🏊',
  'Diving Board': '🤿',
  'Kiddie Pool': '👶',
  Accessibility: '♿',
};

const PoolCard = ({ pool, compact = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className="pool-card"
      onClick={() => navigate(`/pool/${pool.id}`)}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'var(--transition-slow)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--border-accent)';
        e.currentTarget.style.boxShadow =
          'var(--shadow-glow), var(--shadow-card)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          height: compact ? 110 : 150,
          background: pool.gradient,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '12px 16px',
          flexShrink: 0,
        }}
      >
        {/* Decorative water ripple */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 60%, rgba(255,255,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Wave SVG decoration */}
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
          }}
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
          height="32"
        >
          <path
            d="M0,16 C100,32 300,0 400,16 L400,32 L0,32 Z"
            fill="var(--bg-primary)"
            opacity="0.3"
          />
          <path
            d="M0,24 C100,8 300,32 400,24 L400,32 L0,32 Z"
            fill="var(--bg-primary)"
            opacity="0.2"
          />
        </svg>
        {/* Open/Closed */}
        <span
          style={{ position: 'absolute', top: 12, right: 12 }}
          className={pool.isOpenNow ? 'open-badge' : 'closed-badge'}
        >
          {pool.isOpenNow ? '● Open Now' : '● Closed'}
        </span>
        {/* Price badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 10px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {pool.priceDisplay}
        </div>
        {/* Pool icon */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 16,
            fontSize: compact ? '2rem' : '2.5rem',
            opacity: 0.4,
          }}
        >
          🏊
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: compact ? '12px 16px' : '16px 20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: compact ? '1rem' : '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}
          >
            {pool.name}
          </h3>
          <Badge type={pool.type} />
        </div>

        <StarRating rating={pool.rating} size="sm" />

        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span>📍</span> {pool.address.split(',').slice(0, 2).join(',')}
        </p>

        {!compact && (
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {pool.description}
          </p>
        )}

        {/* Feature chips */}
        {!compact && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {pool.features.slice(0, 4).map((f) => (
              <span
                key={f}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 10px',
                  fontSize: '0.73rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {featureIcons[f] || '•'} {f}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            📏 {pool.distance} mi away
          </span>
          <Link
            to={`/pool/${pool.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
};

PoolCard.propTypes = {
  pool: PropTypes.object.isRequired,
  compact: PropTypes.bool,
};
export default PoolCard;
