import PropTypes from 'prop-types';
import StarRating from '../shared/StarRating';

const ReviewSection = ({ reviews, rating, reviewCount }) => (
  <div className="glass-card" style={{ padding: 24 }}>
    {/* Header */}
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
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}
      >
        💬 Reviews
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.2rem',
              fontWeight: 900,
              color: 'var(--accent-cyan)',
              lineHeight: 1,
            }}
          >
            {rating.toFixed(1)}
          </div>
          <StarRating rating={rating} size="sm" showNumber={false} />
          <div
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginTop: 4,
            }}
          >
            {reviewCount} reviews
          </div>
        </div>
      </div>
    </div>

    {/* Review cards */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {reviews.map((review, i) => (
        <div
          key={i}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 18px',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: `hsl(${i * 60 + 160}, 60%, 35%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {review.author[0]}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {review.author}
                </div>
                <div
                  style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}
                >
                  {review.date}
                </div>
              </div>
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            &ldquo;{review.text}&rdquo;
          </p>
        </div>
      ))}
    </div>
  </div>
);
ReviewSection.propTypes = {
  reviews: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};
export default ReviewSection;
