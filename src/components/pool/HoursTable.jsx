import PropTypes from 'prop-types';

const TODAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
][new Date().getDay()];

const HoursTable = ({ hours }) => (
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
      🕐 Hours of Operation
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {Object.entries(hours).map(([day, time], i) => {
        const isToday = day === TODAY;
        const isClosed = time === 'Closed' || time === 'By Reservation';
        return (
          <div
            key={day}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '11px 14px',
              background: isToday
                ? 'rgba(0,196,204,0.08)'
                : i % 2 === 0
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
              borderRadius: 'var(--radius-sm)',
              border: isToday
                ? '1px solid rgba(0,196,204,0.2)'
                : '1px solid transparent',
              transition: 'var(--transition)',
            }}
          >
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: isToday ? 700 : 500,
                color: isToday ? 'var(--accent-cyan)' : 'var(--text-primary)',
              }}
            >
              {isToday && <span style={{ marginRight: 6 }}>→</span>}
              {day}
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isClosed
                  ? 'var(--text-muted)'
                  : isToday
                    ? 'var(--accent-teal)'
                    : 'var(--text-secondary)',
              }}
            >
              {time}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
HoursTable.propTypes = { hours: PropTypes.object.isRequired };
export default HoursTable;
