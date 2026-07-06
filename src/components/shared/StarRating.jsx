import PropTypes from 'prop-types';

const StarRating = ({ rating, size = 'md', showNumber = true }) => {
  const sizeClass =
    size === 'sm' ? '0.75rem' : size === 'lg' ? '1.1rem' : '0.9rem';
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="stars" style={{ fontSize: sizeClass }}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="star star-filled">
          ★
        </span>
      ))}
      {half === 1 && <span className="star star-half">★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="star star-empty">
          ★
        </span>
      ))}
      {showNumber && (
        <span
          style={{
            marginLeft: 5,
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showNumber: PropTypes.bool,
};
export default StarRating;
