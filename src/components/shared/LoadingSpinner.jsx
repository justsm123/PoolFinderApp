import PropTypes from 'prop-types';

const LoadingSpinner = ({ text = 'Finding pools...' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      padding: 60,
    }}
  >
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      {/* Outer ripple ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid var(--accent-cyan)',
          animation: 'ripple 1.4s ease-out infinite',
          opacity: 0,
        }}
      />
      {/* Spinner */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent-cyan)',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      {/* Center drop */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          boxShadow: '0 0 12px var(--accent-cyan)',
        }}
      />
    </div>
    {text && (
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}
      >
        {text}
      </p>
    )}
  </div>
);

LoadingSpinner.propTypes = { text: PropTypes.string };
export default LoadingSpinner;
