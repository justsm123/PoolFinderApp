import PropTypes from 'prop-types';

const activityConfig = {
  'Swim Lessons': {
    icon: '📚',
    desc: 'Group & private lessons for all skill levels',
  },
  Lifeguards: {
    icon: '🛟',
    desc: 'Certified lifeguards on duty during all hours',
  },
  'Water Aerobics': {
    icon: '💪',
    desc: 'Low-impact fitness classes in the pool',
  },
  'Competitive Swimming': {
    icon: '🏆',
    desc: 'Competitive swim team training & meets',
  },
};

const ActivitiesList = ({ activities }) => {
  if (!activities || activities.length === 0) return null;
  return (
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
        🎯 Activities & Programs
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {activities.map((a) => {
          const cfg = activityConfig[a] || {
            icon: '✓',
            desc: 'Available at this facility',
          };
          return (
            <div
              key={a}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.background = 'var(--bg-glass-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--bg-glass)';
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0,196,204,0.1)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {cfg.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    marginBottom: 2,
                  }}
                >
                  {a}
                </div>
                <div
                  style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
                >
                  {cfg.desc}
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  color: '#22d37a',
                  fontSize: '1rem',
                }}
              >
                ✓
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
ActivitiesList.propTypes = { activities: PropTypes.array.isRequired };
export default ActivitiesList;
