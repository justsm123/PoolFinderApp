import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PoolGallery from '../components/pool/PoolGallery';
import PoolInfoCard from '../components/pool/PoolInfoCard';
import AmenitiesGrid from '../components/pool/AmenitiesGrid';
import HoursTable from '../components/pool/HoursTable';
import ActivitiesList from '../components/pool/ActivitiesList';
import PricingCard from '../components/pool/PricingCard';
import ReviewSection from '../components/pool/ReviewSection';
import PoolCard from '../components/shared/PoolCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { usePoolSearchContext } from '../context/PoolSearchContext';

const PoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPoolById, results, pools } = usePoolSearchContext();

  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const getPool = async () => {
      setLoading(true);
      const data = await fetchPoolById(id);
      if (active) {
        setPool(data);
        setLoading(false);
      }
    };
    getPool();
    return () => {
      active = false;
    };
  }, [id, fetchPoolById]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          className="page-wrapper"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
          }}
        >
          <LoadingSpinner />
        </div>
        <Footer />
      </>
    );
  }

  if (!pool) {
    return (
      <>
        <Navbar />
        <div
          className="page-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: 16,
          }}
        >
          <span style={{ fontSize: '4rem' }}>🏊</span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
            }}
          >
            Pool not found
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/search')}
          >
            Browse all pools
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Related pools (same type, excluding current, looking in current search results, fallback to all pools in memory)
  const sourceList = results.length > 1 ? results : pools;
  const related = sourceList
    .filter((p) => p.type === pool.type && String(p.id) !== String(pool.id))
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        {/* Hero banner */}
        <div
          style={{
            height: 280,
            background: pool.gradient,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, transparent 40%, rgba(240,248,255,0.85))',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
            }}
          />
          <svg
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            height="100"
          >
            <path
              d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z"
              fill="var(--bg-primary)"
              opacity="0.7"
            />
          </svg>
          <div
            className="container"
            style={{ position: 'relative', zIndex: 1, paddingBottom: 24 }}
          >
            {/* Breadcrumb */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Home
              </Link>
              <span>›</span>
              <Link to="/search" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Search
              </Link>
              <span>›</span>
              <span style={{ color: '#fff' }}>{pool.name}</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 900,
                color: '#fff',
                marginBottom: 4,
              }}
            >
              {pool.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              📍 {pool.address}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container" style={{ padding: '32px 24px 80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: 28,
              alignItems: 'start',
            }}
          >
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <PoolGallery pool={pool} />
              <AmenitiesGrid amenities={pool.amenities} />
              <ActivitiesList activities={pool.activities} />
              <ReviewSection
                reviews={pool.reviews}
                rating={pool.rating}
                reviewCount={pool.reviewCount}
              />
            </div>

            {/* Right sidebar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'sticky',
                top: 'calc(var(--navbar-height) + 16px)',
              }}
            >
              <PoolInfoCard pool={pool} />
              <HoursTable hours={pool.hours} />
              <PricingCard pricing={pool.pricing} priceType={pool.priceType} />
              {/* CTA */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,196,204,0.1), rgba(26,120,255,0.1))',
                  border: '1px solid var(--border-accent)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 6,
                  }}
                >
                  See on Map
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: 14,
                  }}
                >
                  View location and nearby pools
                </p>
                <Link
                  to="/map"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  🗺️ Open Map View
                </Link>
              </div>
            </div>
          </div>

          {/* Related pools */}
          {related.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: 24,
                }}
              >
                More {pool.type} Pools
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 22,
                }}
              >
                {related.map((p) => (
                  <PoolCard key={p.id} pool={p} />
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default PoolDetail;
