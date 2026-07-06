import PropTypes from 'prop-types';

const typeConfig = {
  Public: { className: 'badge-public', label: 'Public' },
  'Private Rental': { className: 'badge-private', label: 'Private' },
  Hotel: { className: 'badge-hotel', label: 'Hotel' },
  Community: { className: 'badge-community', label: 'Community' },
  'Athletic Club': { className: 'badge-athletic', label: 'Athletic Club' },
};

const Badge = ({ type }) => {
  const config = typeConfig[type] || { className: 'badge-public', label: type };
  return <span className={`badge ${config.className}`}>{config.label}</span>;
};

Badge.propTypes = { type: PropTypes.string.isRequired };
export default Badge;
