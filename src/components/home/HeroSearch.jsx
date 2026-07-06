import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoolSearchContext } from '../../context/PoolSearchContext';

const HeroSearch = () => {
  const [query, setQuery] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { searchCoordinates, searchLocation } = usePoolSearchContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchLocation(query);
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleGeoSearch = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await searchCoordinates(latitude, longitude, 'My Location');
        setGeoLoading(false);
        navigate('/search');
      },
      (err) => {
        alert(err.message || 'Unable to retrieve your location.');
        setGeoLoading(false);
      },
      { timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Warm sunny pool background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Warm sky-to-water gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, #fffbeb 0%, #bae6fd 25%, #7dd3fc 55%, #38bdf8 80%, #0ea5e9 100%)',
          }}
        />
        {/* Animated glowing blobs */}
        {[
          {
            w: 700,
            h: 700,
            t: '-200px',
            l: '-200px',
            bg: 'radial-gradient(circle, rgba(253,230,138,0.35) 0%, transparent 70%)',
            dur: '8s',
          },
          {
            w: 600,
            h: 600,
            t: '10%',
            r: '-100px',
            bg: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
            dur: '12s',
          },
          {
            w: 500,
            h: 500,
            b: '-100px',
            l: '20%',
            bg: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            dur: '10s',
          },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: b.w,
              height: b.h,
              top: b.t,
              left: b.l,
              right: b.r,
              bottom: b.b,
              background: b.bg,
              borderRadius: '50%',
              animation: `float ${b.dur} ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
        {/* Water wave effect at bottom */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          height="180"
        >
          <path
            d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,180 L0,180 Z"
            fill="rgba(255,255,255,0.3)"
          />
          <path
            d="M0,120 C360,60 720,160 1080,100 C1260,70 1380,130 1440,120 L1440,180 L0,180 Z"
            fill="rgba(255,255,255,0.2)"
          />
          <path
            d="M0,150 C480,130 960,175 1440,150 L1440,180 L0,180 Z"
            fill="var(--bg-primary)"
            opacity="0.6"
          />
        </svg>
        {/* Floating pool emoji decorations */}
        {['🏊', '🤿', '💦', '🌊', '☀️'].map((em, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${1.5 + i * 0.3}rem`,
              opacity: 0.22,
              animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
              top: `${15 + i * 14}%`,
              left: `${[5, 88, 10, 80, 50][i]}%`,
            }}
          >
            {em}
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        {/* Label */}
        <div style={{ marginBottom: 20, animation: 'fadeInUp 0.6s ease both' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#0369a1',
              letterSpacing: '0.5px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 12px rgba(0,100,180,0.12)',
            }}
          >
            🌊 Global Pool Discovery Engine
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: 24,
            animation: 'fadeInUp 0.6s ease 0.1s both',
          }}
        >
          <span
            style={{
              background:
                'linear-gradient(135deg, #0c4a6e 20%, #0369a1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Find Your
          </span>
          <br />
          <span
            style={{
              background:
                'linear-gradient(135deg, #0284c7 0%, #0ea5e9 55%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Perfect Pool
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#0c4a6e',
            maxWidth: 540,
            margin: '0 auto 40px',
            lineHeight: 1.7,
            animation: 'fadeInUp 0.6s ease 0.2s both',
            fontWeight: 500,
          }}
        >
          Search public pools, private rentals, hotel pools & athletic clubs
          worldwide. Enter any city, country, or zip code.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}
        >
          <div
            style={{
              display: 'flex',
              gap: 0,
              maxWidth: 600,
              margin: '0 auto 16px',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255,255,255,0.98)',
              borderRadius: 'var(--radius-full)',
              padding: '6px',
              boxShadow: '0 8px 40px rgba(0,100,180,0.2), 0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 16,
                color: 'var(--accent-cyan)',
                fontSize: '1.1rem',
              }}
            >
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pools by name, city, or zip code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '12px 16px',
                color: '#0f3460',
                fontSize: '0.95rem',
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '10px 24px',
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Geo button */}
        <button
          onClick={handleGeoSearch}
          disabled={geoLoading}
          style={{
            animation: 'fadeInUp 0.6s ease 0.35s both',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.65)',
            border: '1.5px solid rgba(255,255,255,0.88)',
            borderRadius: 'var(--radius-full)',
            padding: '10px 20px',
            color: '#0369a1',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'var(--transition)',
            marginBottom: 48,
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.color = 'var(--accent-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.65)';
            e.currentTarget.style.color = '#0369a1';
          }}
        >
          {geoLoading ? '⏳' : '📍'}{' '}
          {geoLoading ? 'Locating...' : 'Use my current location'}
        </button>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease 0.45s both',
          }}
        >
          {[
            ['150K+', 'Pools Indexed'],
            ['5', 'Pool Types'],
            ['Global', 'Coverage'],
          ].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#0c4a6e',
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: '#0369a1',
                  marginTop: 4,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            color: '#0369a1',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Scroll
        </span>
        <span style={{ color: '#0288d1', fontSize: '1.2rem' }}>
          ↓
        </span>
      </div>
    </section>
  );
};

export default HeroSearch;
