import PropTypes from 'prop-types';

const EmptyState = ({
  title = 'No pools found',
  message = 'Try adjusting your filters or search a different area.',
  onReset,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '64px 24px',
      textAlign: 'center',
    }}
  >
    <div
      style={{ fontSize: '4rem', animation: 'float 3s ease-in-out infinite' }}
    >
      🏊
    </div>
    <h3
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.4rem',
        color: 'var(--text-primary)',
      }}
    >
      {title}
    </h3>
    <p
      style={{ color: 'var(--text-secondary)', maxWidth: 340, lineHeight: 1.7 }}
    >
      {message}
    </p>
    {onReset && (
      <button className="btn btn-outline" onClick={onReset}>
        Clear filters
      </button>
    )}
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onReset: PropTypes.func,
};
export default EmptyState;
