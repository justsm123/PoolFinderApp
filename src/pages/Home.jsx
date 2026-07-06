import HeroSearch from '../components/home/HeroSearch';
import FilterBar from '../components/home/FilterBar';
import FeaturedPools from '../components/home/FeaturedPools';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Category feature cards below hero
const CATEGORIES = [
  {
    icon: '🏙️',
    label: 'Public',
    desc: 'City & county pools',
    color: 'rgba(0,168,89,0.1)',
    border: 'rgba(0,168,89,0.25)',
  },
  {
    icon: '🔑',
    label: 'Private Rental',
    desc: 'Book for your group',
    color: 'rgba(0,151,167,0.1)',
    border: 'rgba(0,151,167,0.28)',
  },
  {
    icon: '🏨',
    label: 'Hotel',
    desc: 'Resort experiences',
    color: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.28)',
  },
  {
    icon: '🤝',
    label: 'Community',
    desc: 'Neighborhood centers',
    color: 'rgba(99,102,241,0.1)',
    border: 'rgba(99,102,241,0.25)',
  },
  {
    icon: '🏋️',
    label: 'Athletic Club',
    desc: 'Premium fitness',
    color: 'rgba(251,146,60,0.1)',
    border: 'rgba(251,146,60,0.28)',
  },
];

const Home = () => (
  <>
    <Navbar />
    <main>
      <HeroSearch />
      <FilterBar />

      {/* Category cards */}
      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: 8 }}>
            Browse by Type
          </p>
          <h2 className="section-title" style={{ marginBottom: 28 }}>
            Every Kind of Pool
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 14,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.label}
                style={{
                  background: cat.color,
                  border: `1px solid ${cat.border}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '22px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'var(--transition-slow)',
                  animation: `fadeInUp 0.5s ease ${i * 0.08}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.filter = 'brightness(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}
                  >
                    {cat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedPools />

      {/* How it works */}
      <section style={{ padding: '64px 0', background: 'rgba(186,230,253,0.25)', borderRadius: 'var(--radius-xl)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label">How It Works</p>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Find Your Pool in 3 Steps
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 32,
            }}
          >
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Search',
                desc: 'Enter your city, zip code, or use geolocation to find pools near you.',
              },
              {
                step: '02',
                icon: '⚙️',
                title: 'Filter',
                desc: 'Narrow results by type, features, activities, pricing, and availability.',
              },
              {
                step: '03',
                icon: '🏊',
                title: 'Dive In',
                desc: 'View pool details, hours, pricing, and get directions instantly.',
              },
            ].map((s, i) => (
              <div
                key={s.step}
                style={{ animation: `fadeInUp 0.5s ease ${i * 0.15}s both` }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '4rem',
                      fontWeight: 900,
                      color: 'rgba(0,196,204,0.08)',
                      lineHeight: 1,
                      position: 'absolute',
                      top: -12,
                    }}
                  >
                    {s.step}
                  </span>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 'var(--radius-lg)',
                      background:
                        'linear-gradient(135deg, rgba(0,151,167,0.15), rgba(2,136,209,0.15))',
                      border: '1px solid var(--border-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      position: 'relative',
                    }}
                  >
                    {s.icon}
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    marginBottom: 10,
                    color: 'var(--text-primary)',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Home;
