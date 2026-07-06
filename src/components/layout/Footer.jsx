import { Link } from 'react-router-dom';

const Footer = () => (
  <footer
    style={{
      background: 'linear-gradient(180deg, var(--bg-secondary) 0%, #d4edf9 100%)',
      borderTop: '1px solid var(--border)',
      marginTop: 80,
      padding: '48px 0 28px',
    }}
  >
    <div className="container">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              🏊
            </div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text-primary)',
              }}
            >
              Pool<span style={{ color: 'var(--accent-cyan)' }}>Finder</span>
            </span>
          </div>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}
          >
            Discover the best pools near you — public, private, hotel, and more.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 14,
              fontSize: '0.95rem',
            }}
          >
            Explore
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['/', 'Home'],
              ['/search', 'Search Pools'],
              ['/map', 'Map View'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--accent-cyan)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--text-muted)')
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pool Types */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 14,
              fontSize: '0.95rem',
            }}
          >
            Pool Types
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Public Pools',
              'Private Rentals',
              'Hotel Pools',
              'Community Pools',
              'Athletic Clubs',
            ].map((t) => (
              <li key={t}>
                <Link
                  to="/search"
                  style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--accent-cyan)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--text-muted)')
                  }
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 14,
              fontSize: '0.95rem',
            }}
          >
            Location
          </h4>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
            }}
          >
            📍 Atlanta, GA
            <br />
            Serving the Greater Atlanta Area
            <br />
            Piedmont Park · Buckhead · Decatur
            <br />
            Chastain · Grant Park
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 PoolFinder. All rights reserved.
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Built with 🌊 for Atlanta swimmers
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
