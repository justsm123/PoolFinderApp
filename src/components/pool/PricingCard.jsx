import PropTypes from 'prop-types';

const PricingCard = ({ pricing, priceType }) => (
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
      💰 Pricing
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {pricing.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: i === 0 ? 'rgba(0,196,204,0.08)' : 'var(--bg-glass)',
            border: `1px solid ${i === 0 ? 'var(--border-accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {item.type}
            </span>
          </div>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: item.price === 'Free' ? '#22d37a' : 'var(--accent-cyan)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {item.price}
          </span>
        </div>
      ))}
    </div>

    {priceType === 'Free' && (
      <div
        style={{
          marginTop: 16,
          background: 'rgba(34,211,122,0.08)',
          border: '1px solid rgba(34,211,122,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.82rem',
          color: '#22d37a',
          fontWeight: 600,
        }}
      >
        🎉 Free admission for city residents!
      </div>
    )}
  </div>
);
PricingCard.propTypes = {
  pricing: PropTypes.array.isRequired,
  priceType: PropTypes.string.isRequired,
};
export default PricingCard;
