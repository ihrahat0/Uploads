// icons.jsx — Icon library for WhalesCoin

const Icon = {
  compass: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z" fill={c} fillOpacity="0.15"/>
    </svg>
  ),
  users: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9.5" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  search: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  pulse: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2-7 4 14 2-7h6"/>
    </svg>
  ),
  wallet: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
      <path d="M21 11V8a1 1 0 0 0-1-1H5a2 2 0 0 1 0-4h14v4"/>
      <circle cx="17" cy="13" r="1.2" fill={c}/>
    </svg>
  ),
  sparkles: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
    </svg>
  ),
  radio: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" fill={c}/>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49"/>
      <path d="M20.07 4.93a10 10 0 0 1 0 14.14M3.93 19.07a10 10 0 0 1 0-14.14"/>
    </svg>
  ),
  bookmark: (s = 20, c = 'currentColor', filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-4z"/>
    </svg>
  ),
  chat: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  bell: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  cog: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.25 1 1.51.66.25 1.42.14 1.95-.25 0 0 .06.36.06.74 0 .66-.39 1.25-1 1.51-.61.26-1.3.15-1.82-.26"/>
    </svg>
  ),
  reply: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  repost: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m17 3 4 4-4 4"/><path d="M21 7H7a4 4 0 0 0-4 4v2"/>
      <path d="m7 21-4-4 4-4"/><path d="M3 17h14a4 4 0 0 0 4-4v-2"/>
    </svg>
  ),
  heart: (s = 18, c = 'currentColor', filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  eye: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  share: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>
    </svg>
  ),
  coin: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  zap: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1" strokeLinejoin="round">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z"/>
    </svg>
  ),
  verified: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="m12 2 2.5 2.2 3.3-.5 1.5 3 3 1.5-.5 3.3L24 14l-2.2 2.5.5 3.3-3 1.5-1.5 3-3.3-.5L12 26l-2.5-2.2-3.3.5-1.5-3-3-1.5.5-3.3L0 14l2.2-2.5-.5-3.3 3-1.5 1.5-3 3.3.5z" fill="#7C5CFF" transform="scale(0.7) translate(5.1 5.1)"/>
      <path d="m8 12 3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  whale: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16c2-3 5-4 8-4 4 0 6 2 8 2 2 0 3-1 4-2-1 5-5 8-10 8-4 0-8-2-10-4z" fill={c} fillOpacity="0.2"/>
      <circle cx="8" cy="14" r="0.8" fill={c}/>
      <path d="M15 10c0-3 2-5 5-5-1 2-1 4 0 5"/>
    </svg>
  ),
  dot3: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>
    </svg>
  ),
  chevDown: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  plus: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  arrowUp: (s = 12, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 15 6-6 6 6"/>
    </svg>
  ),
  arrowDown: (s = 12, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  image: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="9" cy="9" r="1.6"/>
      <path d="m21 15-5-5-10 10"/>
    </svg>
  ),
  chartMini: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l5-7 4 3 6-9"/>
    </svg>
  ),
  gift: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/>
      <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8S15 3 16.5 3a2.5 2.5 0 0 1 0 5"/>
    </svg>
  ),
  ai: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2z"/>
      <path d="M19 3v4M17 5h4"/>
    </svg>
  ),
  flame: (s = 12, c = '#FF6A3D') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s1 2 3 2c0-4-3-5 1-9z"/>
    </svg>
  ),
};

// Coin symbol rendering — stylized colored circles
const CoinIcon = ({ sym, size = 16 }) => {
  const colors = {
    ETH: '#627EEA', BTC: '#F7931A', SOL: '#9945FF', BONK: '#F9B949',
    WHALE: '#7C5CFF', ARB: '#28A0F0', WIF: '#FFB84D', TON: '#0098EA',
  };
  const c = colors[sym] || '#888';
  const mark = { ETH: '◆', BTC: '₿', SOL: '◎', WHALE: '🐋', BONK: 'B', ARB: 'A', WIF: 'W', TON: 'T' }[sym] || sym[0];
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: c, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.56, fontWeight: 700, flexShrink: 0,
      boxShadow: `0 0 0 1px ${c}30, 0 2px 6px ${c}40`,
    }}>{mark}</div>
  );
};

// Whalescoin logo — abstract whale silhouette + wordmark
const WhalesCoinLogo = ({ size = 28 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="wcLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9E7CFF"/>
          <stop offset="1" stopColor="#5B3FFF"/>
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#wcLogo)"/>
      <path d="M8 22c3-4 7-5 11-5 5 0 8 2 11 3 1-1 2-3 2-5-0 3-1 7-4 10-3 3-7 4-11 4-4 0-7-2-9-5z" fill="#fff" fillOpacity="0.95"/>
      <circle cx="14" cy="20" r="1.3" fill="#5B3FFF"/>
    </svg>
    <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: size * 0.85, letterSpacing: -0.5, lineHeight: 1, color: '#F4F3FF' }}>
      Whales<span style={{ fontStyle: 'italic', opacity: 0.7 }}>coin</span>
    </div>
  </div>
);

Object.assign(window, { Icon, CoinIcon, WhalesCoinLogo });
