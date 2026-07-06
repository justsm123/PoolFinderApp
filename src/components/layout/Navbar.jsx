import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePoolSearchContext } from '../../context/PoolSearchContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/map', label: 'Map' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { searchName } = usePoolSearchContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--navbar-height)',
              background: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-accent)' : 'var(--border)'}`,
        transition: 'var(--transition-slow)',
        boxShadow: scrolled ? '0 4px 24px rgba(0, 100, 160, 0.12)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              boxShadow: '0 0 16px rgba(0,196,204,0.4)',
              flexShrink: 0,
            }}
          >
            🏊
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              Pool<span style={{ color: 'var(--accent-cyan)' }}>Finder</span>
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              {searchName}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color:
                  pathname === link.to
                    ? 'var(--accent-cyan)'
                    : 'var(--text-secondary)',
                background:
                  pathname === link.to ? 'rgba(0,196,204,0.1)' : 'transparent',
                transition: 'var(--transition)',
                textDecoration: 'none',
                border:
                  pathname === link.to
                    ? '1px solid var(--border-accent)'
                    : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.to)
                  e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.to)
                  e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/search')}
            style={{ display: 'flex' }}
          >
            Find Pools
          </button>
          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-icon mobile-menu-btn"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
            style={{ display: 'none' }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
                    background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          animation: 'fadeInUp 0.2s ease',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 600,
                color:
                  pathname === link.to
                    ? 'var(--accent-cyan)'
                    : 'var(--text-secondary)',
                background:
                  pathname === link.to ? 'rgba(0,196,204,0.1)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
