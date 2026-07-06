import PropTypes from 'prop-types';
import Badge from '../shared/Badge';
import StarRating from '../shared/StarRating';

const PoolInfoCard = ({ pool }) => (
  <div className="glass-card" style={{ padding: 28 }}>
    {/* Type + Open status */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        flexWrap: 'wrap',
      }}
    >
      <Badge type={pool.type} />
      <span
        className={pool.isOpenNow ? 'open-badge' : 'closed-badge'}
        style={{ fontSize: '0.82rem' }}
      >
        {pool.isOpenNow ? '● Open Now' : '● Currently Closed'}
      </span>
    </div>

    <h1
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.8rem',
        fontWeight: 900,
        color: 'var(--text-primary)',
        lineHeight: 1.2,
        marginBottom: 12,
      }}
    >
      {pool.name}
    </h1>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
      }}
    >
      <StarRating rating={pool.rating} size="lg" />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        ({pool.reviewCount} reviews)
      </span>
    </div>

    <p
      style={{
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        marginBottom: 24,
        fontSize: '0.95rem',
      }}
    >
      {pool.description}
    </p>

    <hr className="divider" />

    {/* Contact details */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { icon: '📍', label: 'Address', value: pool.address },
        {
          icon: '📞',
          label: 'Phone',
          value: pool.phone,
          href: `tel:${pool.phone}`,
        },
        {
          icon: '🌐',
          label: 'Website',
          value: pool.website,
          href: `https://${pool.website}`,
          ext: true,
        },
        { icon: '💰', label: 'Starting at', value: pool.priceDisplay },
        { icon: '📏', label: 'Distance', value: `${pool.distance} miles away` },
      ].map(({ icon, label, value, href, ext }) => (
        <div
          key={label}
          style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
        >
          <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>
            {icon}
          </span>
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'block',
                marginBottom: 2,
              }}
            >
              {label}
            </span>
            {href ? (
              <a
                href={href}
                target={ext ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {value}
              </a>
            ) : (
              <span
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }}
              >
                {value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
PoolInfoCard.propTypes = { pool: PropTypes.object.isRequired };
export default PoolInfoCard;
