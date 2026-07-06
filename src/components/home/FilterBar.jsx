import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUICK_FILTERS = [
  { id: 'open', label: '🟢 Open Now', param: 'openNow=true' },
  { id: 'free', label: '🆓 Free', param: 'pricing=Free' },
  { id: 'public', label: '🏙️ Public', param: 'type=Public' },
  { id: 'indoor', label: '🏠 Indoor', param: 'feature=Indoor' },
  { id: 'heated', label: '🔥 Heated', param: 'feature=Heated' },
  { id: 'saltwater', label: '🌊 Saltwater', param: 'feature=Saltwater' },
  { id: 'laps', label: '🏊 Lap Lanes', param: 'feature=Lap+Lanes' },
  { id: 'lessons', label: '📚 Swim Lessons', param: 'activity=Swim+Lessons' },
  { id: 'private', label: '🔑 Private Rental', param: 'type=Private+Rental' },
  { id: 'hotel', label: '🏨 Hotel Pool', param: 'type=Hotel' },
];

const FilterBar = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleClick = (filter) => {
    setActive(filter.id === active ? null : filter.id);
    navigate(`/search?${filter.param}`);
  };

  return (
    <section style={{ padding: '0 0 32px', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: 12,
          }}
        >
          Quick Filters
        </p>
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`chip ${active === f.id ? 'active' : ''}`}
              onClick={() => handleClick(f)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
