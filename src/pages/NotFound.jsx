import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => (
  <>
    <Navbar />
    <div
      className="page-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - var(--navbar-height))',
        textAlign: 'center',
        padding: '60px 24px',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          animation: 'float 3s ease-in-out infinite',
          marginBottom: 24,
        }}
      >
        🏊
      </div>
      <p
        style={{
          color: 'var(--accent-cyan)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.85rem',
          marginBottom: 12,
        }}
      >
        404 — Pool Not Found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginBottom: 16,
          lineHeight: 1.1,
        }}
      >
        Looks like you swam
        <br />
        into the deep end
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          maxWidth: 420,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Maybe the pool
        moved, or the URL has a typo.
      </p>
      <div
        style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/search" className="btn btn-outline">
          Search Pools
        </Link>
        <Link to="/map" className="btn btn-ghost">
          View Map
        </Link>
      </div>
    </div>
    <Footer />
  </>
);

export default NotFound;
