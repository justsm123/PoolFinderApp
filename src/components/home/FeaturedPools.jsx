import { useNavigate } from 'react-router-dom';
import { getFeaturedPools } from '../../data/pools';
import PoolCard from '../shared/PoolCard';

const FeaturedPools = () => {
  const pools = getFeaturedPools();
  const navigate = useNavigate();

  return (
    <section style={{ padding: '64px 0' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 36,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p className="section-label">Featured</p>
            <h2 className="section-title">Top Pools Near You</h2>
            <p className="section-subtitle">
              Highly rated pools within the Atlanta metro area, hand-picked for
              you.
            </p>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/search')}
          >
            View all pools →
          </button>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {pools.map((pool, i) => (
            <div
              key={pool.id}
              style={{ animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}
            >
              <PoolCard pool={pool} />
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          style={{
            marginTop: 48,
            background:
              'linear-gradient(135deg, rgba(0,151,167,0.08), rgba(2,136,209,0.08))',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 8,
              }}
            >
              🗺️ Prefer a map view?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              See all pools plotted on an interactive map with pricing and
              ratings.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/map')}>
            Open Map View
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPools;
