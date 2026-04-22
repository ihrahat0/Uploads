// coin-page.jsx — WhalesCoin coin details page for $WHALE
// Aesthetic: dark + off-white only. Mono type throughout. No italic. Minimal color accents.

const COIN = {
  name: 'WhalesCoin',
  sym: 'WHALE',
  rank: 42,
  price: 4.8247,
  chg24h: 2.61,
  chg1h: 0.12,
  chg7d: -3.14,
  range24Low: 4.21,
  range24High: 5.09,
  range7dLow: 3.94,
  range7dHigh: 5.22,
  marketCap: 2_184_920_441,
  fdv: 4_824_100_000,
  vol24: 318_402_119,
  circSupply: 452_914_000,
  totalSupply: 1_000_000_000,
  maxSupply: 1_000_000_000,
  treasury: 84_000_000,
  ath: 6.12, athDate: 'Mar 21, 2026', athPct: -21.2,
  atl: 0.042, atlDate: 'Nov 04, 2023', atlPct: 11386,
  holders: 184_912,
};

// Palette — off-white on near-black. One single positive/negative signal color only.
const C = {
  bg: '#0A0A0B',
  bg2: '#0F0F11',
  bg3: '#141416',
  line: 'rgba(245,243,235,0.08)',
  lineSoft: 'rgba(245,243,235,0.05)',
  text: '#F5F3EB',
  textDim: 'rgba(245,243,235,0.62)',
  textMute: 'rgba(245,243,235,0.42)',
  up: '#9FE870',
  down: '#FF6A6A',
};

const MONO = "'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// Synthetic price series for charts
const makeSeries = (seed = 1, base = 4.2, vol = 0.15, trend = 0.01, n = 120) => {
  const out = [];
  let v = base;
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < n; i++) {
    v += (rand() - 0.48) * vol + trend;
    out.push(Math.max(0.1, v));
  }
  return out;
};
const PRICE_SERIES = makeSeries(7, 4.1, 0.14, 0.012, 120);

// ============================================================
// PAGE
// ============================================================
function CoinPage() {
  const [tab, setTab] = React.useState('overview');
  React.useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem('wc_coin') || '{}'); if (s.tab) setTab(s.tab); } catch {}
  }, []);
  React.useEffect(() => { localStorage.setItem('wc_coin', JSON.stringify({ tab })); }, [tab]);

  return (
    <div data-screen-label="WhalesCoin · $WHALE" style={{
      minHeight: '100vh', color: C.text,
      fontFamily: MONO,
      background: C.bg,
    }}>
      <TopBar/>
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px 80px' }}>
        <Breadcrumbs/>
        <CoinHero/>
        <TabBar tab={tab} setTab={setTab}/>
        <div style={{ marginTop: 24 }}>
          {tab === 'overview' && <OverviewSection/>}
          {tab === 'markets' && <MarketsSection/>}
          {tab === 'news' && <NewsSection/>}
          {tab === 'similar' && <SimilarSection/>}
          {tab === 'historical' && <HistoricalSection/>}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// TOP BAR
// ============================================================
function TopBar() {
  return (
    <header style={{
      borderBottom: `1px solid ${C.line}`,
      padding: '14px 40px',
      display: 'flex', alignItems: 'center', gap: 18,
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(10,10,11,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: C.text, color: C.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, letterSpacing: -0.5,
        }}>W</div>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.3 }}>Whalescoin</span>
      </div>

      <nav style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
        {['Cryptocurrencies', 'Exchanges', 'NFT', 'Learn'].map((l, i) => (
          <a key={l} style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 13,
            color: i === 0 ? C.text : C.textDim, fontWeight: 500,
            cursor: 'pointer', textDecoration: 'none',
          }}>{l}</a>
        ))}
      </nav>

      <div style={{
        marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10,
        padding: '7px 12px', borderRadius: 10, width: 280,
        background: C.bg3, border: `1px solid ${C.line}`,
      }}>
        {Icon.search(14, C.textMute)}
        <input placeholder="Search coins, exchanges…" style={{
          flex: 1, background: 'none', border: 'none', outline: 'none',
          color: C.text, fontSize: 12.5, fontFamily: MONO,
        }}/>
        <kbd style={{
          padding: '1px 6px', fontSize: 10, borderRadius: 4,
          background: 'rgba(245,243,235,0.06)', color: C.textMute,
        }}>⌘K</kbd>
      </div>

      <button style={{
        padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
        background: 'transparent', border: `1px solid ${C.line}`, color: C.text,
        cursor: 'pointer', fontFamily: MONO,
      }}>Sign in</button>
      <button style={{
        padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
        background: C.text, color: C.bg, border: 'none', cursor: 'pointer', fontFamily: MONO,
      }}>Connect wallet</button>
    </header>
  );
}

// ============================================================
// BREADCRUMBS
// ============================================================
function Breadcrumbs() {
  return (
    <div style={{
      padding: '20px 0 12px',
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 11.5, color: C.textMute,
      textTransform: 'uppercase', letterSpacing: 0.8,
    }}>
      <span style={{ cursor: 'pointer' }}>Cryptocurrencies</span>
      <span>›</span>
      <span style={{ color: C.text }}>WHALE Price</span>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================
function CoinHero() {
  const up = COIN.chg24h >= 0;
  return (
    <section style={{
      padding: '12px 0 28px',
      borderBottom: `1px solid ${C.line}`,
      display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)', gap: 60,
      alignItems: 'flex-start',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <CoinMark size={48}/>
          <h1 style={{
            margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.3, color: C.text,
            fontFamily: MONO,
          }}>
            Whalescoin <span style={{ color: C.textDim, fontWeight: 500 }}>WHALE Price</span>
          </h1>
          <span style={{
            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
            background: C.bg3, border: `1px solid ${C.line}`, color: C.text,
          }}>#{COIN.rank}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <div style={{
            fontSize: 52, fontWeight: 600, lineHeight: 1,
            color: C.text, letterSpacing: -1.5,
            fontVariantNumeric: 'tabular-nums',
          }}>
            ${COIN.price.toFixed(4)}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color: up ? C.up : C.down, fontSize: 15, fontWeight: 600,
          }}>
            {up ? '▲' : '▼'} {Math.abs(COIN.chg24h).toFixed(2)}% <span style={{ color: C.textMute, fontWeight: 500 }}>(24h)</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: C.textDim }}>
          1.0000 WHALE <span style={{ color: C.up }}>▲ 0.0%</span>
        </div>

        {/* 24h range */}
        <div style={{ marginTop: 24, maxWidth: 520 }}>
          <RangeBar lo={COIN.range24Low} hi={COIN.range24High} p={COIN.price} label="24h Range"/>
        </div>

        {/* Watchlist row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, maxWidth: 520 }}>
          <button style={{
            flex: 1, padding: '12px 14px', borderRadius: 12,
            background: C.bg3, border: `1px solid ${C.line}`, color: C.text,
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: MONO,
            display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          }}>
            <span>☆</span> Add to Portfolio <span style={{ color: C.textMute, marginLeft: 4 }}>· 2.37M added</span>
          </button>
          <button style={{
            width: 46, borderRadius: 12,
            background: C.bg3, border: `1px solid ${C.line}`, color: C.text,
            cursor: 'pointer',
          }}>{Icon.bell(16, C.text)}</button>
        </div>
      </div>

      {/* Right: compact stats list */}
      <HeroStats/>
    </section>
  );
}

function CoinMark({ size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3, flexShrink: 0,
      background: C.text, color: C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.46, fontWeight: 700, letterSpacing: -1,
    }}>W</div>
  );
}

function RangeBar({ lo, hi, p, label }) {
  const pct = ((p - lo) / (hi - lo)) * 100;
  return (
    <div>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: C.bg3, border: `1px solid ${C.line}` }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`,
          borderRadius: 3, background: C.text, opacity: 0.9,
        }}/>
        <div style={{
          position: 'absolute', left: `calc(${pct}% - 1px)`, top: -5, bottom: -5,
          width: 2, background: C.text,
        }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11.5 }}>
        <span style={{ color: C.text, fontWeight: 500 }}>${lo.toFixed(2)}</span>
        <span style={{ color: C.textMute, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</span>
        <span style={{ color: C.text, fontWeight: 500 }}>${hi.toFixed(2)}</span>
      </div>
    </div>
  );
}

function HeroStats() {
  const rows = [
    { label: 'Market Cap', value: '$2,184,920,441' },
    { label: 'Fully Diluted Valuation', value: '$4,824,100,000' },
    { label: '24 Hour Trading Vol', value: '$318,402,119' },
    { label: 'Circulating Supply', value: '452,914,000' },
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Max Supply', value: '1,000,000,000' },
    { label: 'Total Treasury Holding', value: '84,000,000' },
  ];
  return (
    <div>
      {rows.map((r, i) => (
        <div key={r.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 0',
          borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${C.line}`,
        }}>
          <span style={{ fontSize: 13, color: C.textDim, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {r.label} <InfoDot/>
          </span>
          <span style={{ fontSize: 13.5, color: C.text, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function InfoDot() {
  return (
    <span style={{
      width: 13, height: 13, borderRadius: 7, border: `1px solid ${C.line}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, color: C.textMute, cursor: 'help',
    }}>i</span>
  );
}

// ============================================================
// TABS
// ============================================================
function TabBar({ tab, setTab }) {
  const tabs = [
    { k: 'overview', label: 'Overview' },
    { k: 'markets', label: 'Markets' },
    { k: 'news', label: 'News' },
    { k: 'similar', label: 'Similar Coins' },
    { k: 'historical', label: 'Historical Data' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 4, marginTop: 28,
      borderBottom: `1px solid ${C.line}`,
      position: 'sticky', top: 54, zIndex: 20,
      background: 'rgba(10,10,11,0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      {tabs.map(t => {
        const active = tab === t.k;
        return (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: active ? 600 : 500,
            color: active ? C.text : C.textDim,
            position: 'relative', fontFamily: MONO,
          }}>
            {t.label}
            {active && (
              <span style={{ position: 'absolute', bottom: -1, left: 10, right: 10, height: 2, background: C.text }}/>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// OVERVIEW
// ============================================================
function OverviewSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>
        <PriceChartCard/>
        <PerformanceStrip/>
        <AboutCard/>
        <TokenomicsCard/>
        <HoldersCard/>
      </div>
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 112 }}>
        <CategoriesCard/>
        <ConverterCard/>
        <HistoricalCard/>
        <InfoLinksCard/>
        <PredictionCard/>
      </aside>
    </div>
  );
}

// --- Price chart ---
function PriceChartCard() {
  const [range, setRange] = React.useState('7D');
  const [mode, setMode] = React.useState('Price');
  const ranges = ['24H', '7D', '1M', '3M', 'YTD', '1Y', 'Max'];

  const W = 820, H = 340;
  const pts = PRICE_SERIES;
  const max = Math.max(...pts) * 1.02, min = Math.min(...pts) * 0.96;
  const xs = i => (i / (pts.length - 1)) * W;
  const ys = v => H - 24 - ((v - min) / (max - min)) * (H - 48);
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(v)}`).join(' ');
  const area = line + ` L${W},${H} L0,${H} Z`;
  const up = COIN.chg24h >= 0;
  const lineColor = up ? C.up : C.down;

  return (
    <section>
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Dropdown label={mode} items={['Price', 'Market cap', 'Volume']} onSelect={setMode}/>
          <Dropdown label="Compare" items={['BTC', 'ETH', 'SOL']}/>
          <IconBtn icon="chartMini"/>
          <IconBtn icon="pulse"/>
        </div>
        <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 10, background: C.bg3, border: `1px solid ${C.line}` }}>
          {ranges.map(r => {
            const active = r === range;
            return (
              <button key={r} onClick={() => setRange(r)} style={{
                padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: active ? C.text : 'transparent',
                color: active ? C.bg : C.textDim,
                fontSize: 12, fontWeight: active ? 600 : 500, fontFamily: MONO,
              }}>{r}</button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 340, display: 'block' }}>
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={lineColor} stopOpacity="0.22"/>
              <stop offset="1" stopColor={lineColor} stopOpacity="0"/>
            </linearGradient>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(245,243,235,0.03)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#gridPattern)"/>
          {[0.12, 0.32, 0.52, 0.72, 0.92].map((t, i) => {
            const v = min + (max - min) * (1 - t);
            const y = 24 + t * (H - 48);
            return (
              <g key={i}>
                <line x1="0" x2={W} y1={y} y2={y} stroke="rgba(245,243,235,0.04)"/>
                <text x={W - 4} y={y - 4} textAnchor="end" fill="rgba(245,243,235,0.42)" fontSize="10" fontFamily="Geist Mono, monospace">${v.toFixed(2)}</text>
              </g>
            );
          })}
          <path d={area} fill="url(#chartFill)"/>
          <path d={line} fill="none" stroke={lineColor} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
          {/* Last price marker */}
          <g>
            <line x1={xs(pts.length - 1)} x2={xs(pts.length - 1)} y1="0" y2={H} stroke={C.textMute} strokeDasharray="3 3" opacity="0.3"/>
            <circle cx={xs(pts.length - 1)} cy={ys(pts[pts.length - 1])} r="4" fill={lineColor} stroke={C.bg} strokeWidth="2"/>
            <g transform={`translate(${xs(pts.length - 1) - 70}, ${ys(pts[pts.length - 1]) - 12})`}>
              <rect width="66" height="22" rx="4" fill={lineColor}/>
              <text x="33" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.bg} fontFamily="Geist Mono, monospace">${pts[pts.length - 1].toFixed(3)}</text>
            </g>
          </g>
        </svg>
        {/* Bottom time labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10.5, color: C.textMute }}>
          {['Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20', 'Apr 21', 'Apr 22'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
    </section>
  );
}

function Dropdown({ label, items, onSelect }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        padding: '7px 10px 7px 12px', borderRadius: 9, border: `1px solid ${C.line}`,
        background: C.bg3, color: C.text, fontSize: 12, fontWeight: 500,
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: MONO,
      }}>
        {label}
        <span style={{ color: C.textMute }}>⌄</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, minWidth: 140, zIndex: 10,
          background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        }}>
          {items.map(it => (
            <div key={it} onClick={() => { onSelect?.(it); setOpen(false); }} style={{
              padding: '8px 12px', fontSize: 12, color: C.text, cursor: 'pointer',
            }} onMouseEnter={e => e.currentTarget.style.background = C.bg3}
               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IconBtn({ icon }) {
  return (
    <button style={{
      width: 34, height: 34, borderRadius: 9, border: `1px solid ${C.line}`,
      background: C.bg3, color: C.textDim, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{Icon[icon](14, 'currentColor')}</button>
  );
}

// --- Performance strip (1h, 24h, 7d, 14d, 30d, 1y) ---
function PerformanceStrip() {
  const cells = [
    { label: '1h', v: COIN.chg1h },
    { label: '24h', v: COIN.chg24h },
    { label: '7d', v: -3.1 },
    { label: '14d', v: 8.4 },
    { label: '30d', v: 22.4 },
    { label: '1y', v: 147.8 },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
      borderRadius: 14, overflow: 'hidden',
      border: `1px solid ${C.line}`, background: C.bg2,
    }}>
      {cells.map((c, i) => {
        const up = c.v >= 0;
        return (
          <div key={c.label} style={{
            padding: '14px 16px',
            borderRight: i === cells.length - 1 ? 'none' : `1px solid ${C.line}`,
          }}>
            <div style={{ fontSize: 11, color: C.textMute, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>{c.label}</div>
            <div style={{
              marginTop: 6, fontSize: 15, fontWeight: 600,
              color: up ? C.up : C.down,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {up ? '▲' : '▼'} {Math.abs(c.v).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- About ---
function AboutCard() {
  return (
    <section style={{ padding: '24px 0', borderTop: `1px solid ${C.line}` }}>
      <SectionTitle>About Whalescoin</SectionTitle>
      <p style={{
        margin: '14px 0 0', fontSize: 14, lineHeight: 1.7, color: C.textDim,
        letterSpacing: -0.05, maxWidth: 740,
      }}>
        $WHALE powers the Whalescoin social graph — an on-chain feed where large wallets publish their conviction alongside their trades. Tokens are used to tip authors, unlock whale-tier signals, and vote on protocol parameters. The network currently tracks {COIN.holders.toLocaleString()} addresses and settles roughly 48,000 transactions per day on Ethereum mainnet.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        {['Social', 'DeFi', 'Ethereum', 'Layer 2', 'DePIN'].map(t => <Chip key={t}>{t}</Chip>)}
      </div>
      <button style={{
        marginTop: 14, background: 'none', border: 'none', color: C.text,
        textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer',
        fontSize: 13, fontFamily: MONO, padding: 0,
      }}>Read more →</button>
    </section>
  );
}

function SectionTitle({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: C.text, letterSpacing: -0.3 }}>{children}</h2>
      {right}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span style={{
      padding: '5px 10px', borderRadius: 7, fontSize: 12,
      background: C.bg3, border: `1px solid ${C.line}`, color: C.textDim,
      cursor: 'pointer',
    }}>{children}</span>
  );
}

// --- Tokenomics ---
function TokenomicsCard() {
  const segs = [
    { label: 'Community', pct: 42 },
    { label: 'Treasury', pct: 20 },
    { label: 'Team', pct: 15 },
    { label: 'Investors', pct: 13 },
    { label: 'Liquidity', pct: 7 },
    { label: 'Advisors', pct: 3 },
  ];
  // Shades of off-white for distinction without color
  const shades = [1, 0.82, 0.66, 0.5, 0.36, 0.24];
  return (
    <section style={{ padding: '24px 0', borderTop: `1px solid ${C.line}` }}>
      <SectionTitle>Tokenomics</SectionTitle>
      <div style={{ marginTop: 16 }}>
        <div style={{
          display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden',
          border: `1px solid ${C.line}`,
        }}>
          {segs.map((s, i) => (
            <div key={s.label} title={`${s.label} · ${s.pct}%`} style={{
              width: `${s.pct}%`, background: `rgba(245,243,235,${shades[i]})`,
              borderRight: i === segs.length - 1 ? 'none' : `1px solid ${C.bg}`,
            }}/>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
          {segs.map((s, i) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              background: C.bg2, border: `1px solid ${C.line}`,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: `rgba(245,243,235,${shades[i]})` }}/>
              <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{s.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12.5, color: C.textDim, fontVariantNumeric: 'tabular-nums' }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Holders ---
function HoldersCard() {
  const holders = [
    { addr: '0xCetacea.eth', tag: 'Team treasury', amt: '84.0M', pct: 8.4 },
    { addr: '0x7c5c…ff42', tag: 'Orca OTC', amt: '52.1M', pct: 5.2 },
    { addr: '0xdeepliq.eth', tag: 'DeepLiquidity', amt: '41.8M', pct: 4.2 },
    { addr: '0x9e7c…abcd', tag: 'Cold wallet', amt: '28.4M', pct: 2.8 },
    { addr: '0xbinance-hot', tag: 'Binance', amt: '24.2M', pct: 2.4 },
    { addr: '0x3a1f…0f2e', tag: 'Uniswap V3', amt: '18.9M', pct: 1.9 },
  ];
  return (
    <section style={{ padding: '24px 0', borderTop: `1px solid ${C.line}` }}>
      <SectionTitle right={
        <button style={{ background: 'none', border: 'none', color: C.textDim, fontSize: 12, cursor: 'pointer', fontFamily: MONO }}>View all →</button>
      }>Top holders</SectionTitle>
      <div style={{ marginTop: 14 }}>
        {/* header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1.6fr 1.2fr 120px 160px',
          gap: 14, padding: '0 0 10px', fontSize: 11, color: C.textMute,
          textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <span>#</span><span>Address</span><span>Tag</span><span style={{ textAlign: 'right' }}>Holding</span><span>% of supply</span>
        </div>
        {holders.map((h, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '40px 1.6fr 1.2fr 120px 160px',
            gap: 14, padding: '12px 0', alignItems: 'center', fontSize: 13,
            borderBottom: i === holders.length - 1 ? 'none' : `1px solid ${C.lineSoft}`,
          }}>
            <span style={{ color: C.textMute }}>{i + 1}</span>
            <span style={{ color: C.text }}>{h.addr}</span>
            <span style={{ color: C.textDim }}>{h.tag}</span>
            <span style={{ color: C.text, textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{h.amt}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: C.bg3, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, h.pct * 10)}%`, height: '100%', background: C.text, opacity: 0.8 }}/>
              </div>
              <span style={{ fontSize: 11.5, color: C.textDim, width: 40, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{h.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// RIGHT-RAIL CARDS
// ============================================================
function RailCard({ title, children, right }) {
  return (
    <section style={{
      borderRadius: 14, padding: 18, background: C.bg2, border: `1px solid ${C.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: -0.2 }}>{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

function CategoriesCard() {
  return (
    <RailCard title="Categories" right={
      <button style={{ background: 'none', border: 'none', color: C.textDim, fontSize: 12, cursor: 'pointer', fontFamily: MONO }}>6 more ⌄</button>
    }>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Social', 'Layer 2', 'DePIN'].map(t => <Chip key={t}>{t}</Chip>)}
      </div>
    </RailCard>
  );
}

function ConverterCard() {
  const [whale, setWhale] = React.useState(1);
  const usd = (whale * COIN.price).toFixed(2);
  return (
    <RailCard title="WHALE Converter">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ConvInput value={whale} onChange={setWhale} symbol="WHALE"/>
        <ConvInput value={usd} symbol="USD" readOnly/>
      </div>
      <button style={{
        marginTop: 14, width: '100%', padding: '12px 14px', borderRadius: 11,
        background: C.text, color: C.bg, border: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 600, fontFamily: MONO,
      }}>Trade $WHALE</button>
    </RailCard>
  );
}

function ConvInput({ value, onChange, symbol, readOnly }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '12px 14px',
      borderRadius: 11, background: C.bg3, border: `1px solid ${C.line}`,
    }}>
      <input value={value} onChange={e => onChange?.(parseFloat(e.target.value) || 0)} readOnly={readOnly} style={{
        flex: 1, background: 'none', border: 'none', outline: 'none',
        color: C.text, fontSize: 16, fontFamily: MONO, fontWeight: 500, fontVariantNumeric: 'tabular-nums',
        minWidth: 0, padding: 0,
      }}/>
      <span style={{ fontSize: 13, color: C.textDim, fontWeight: 500 }}>{symbol}</span>
    </div>
  );
}

function HistoricalCard() {
  const rows = [
    { label: '24h Range', value: `$${COIN.range24Low} – $${COIN.range24High}` },
    { label: '7d Range', value: `$${COIN.range7dLow} – $${COIN.range7dHigh}` },
    { label: 'All-Time High', value: `$${COIN.ath.toFixed(2)}`, sub: `▼ ${Math.abs(COIN.athPct)}%`, subColor: C.down, date: COIN.athDate },
    { label: 'All-Time Low', value: `$${COIN.atl.toFixed(3)}`, sub: `▲ ${COIN.atlPct.toLocaleString()}%`, subColor: C.up, date: COIN.atlDate },
  ];
  return (
    <RailCard title="WHALE Historical Price">
      <div>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: '12px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}`,
            gap: 10,
          }}>
            <span style={{ fontSize: 12.5, color: C.textDim }}>{r.label}</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                {r.value}
                {r.sub && <span style={{ marginLeft: 8, color: r.subColor, fontSize: 12 }}>{r.sub}</span>}
              </div>
              {r.date && <div style={{ fontSize: 11, color: C.textMute, marginTop: 3 }}>{r.date}</div>}
            </div>
          </div>
        ))}
      </div>
    </RailCard>
  );
}

function InfoLinksCard() {
  const groups = [
    { label: 'Website', items: ['whalescoin.io', 'Whitepaper'] },
    { label: 'Explorers', items: ['Etherscan'] },
    { label: 'Wallets', items: ['Ledger', 'Rabby'] },
    { label: 'Community', items: ['Discord', 'X', 'Farcaster', 'Reddit'] },
    { label: 'Search on', items: ['Twitter'] },
    { label: 'Source Code', items: ['GitHub'] },
  ];
  return (
    <RailCard title="Info">
      <div>
        {groups.map((g, i) => (
          <div key={g.label} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr', gap: 10,
            padding: '10px 0', alignItems: 'center',
            borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}`,
          }}>
            <span style={{ fontSize: 12, color: C.textDim }}>{g.label}</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {g.items.map(it => (
                <span key={it} style={{
                  padding: '4px 9px', borderRadius: 6, fontSize: 11.5,
                  background: C.bg3, border: `1px solid ${C.line}`, color: C.text,
                  cursor: 'pointer', fontFamily: MONO,
                }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RailCard>
  );
}

function PredictionCard() {
  const rows = [
    { p: '$6.00', pct: 13.1 },
    { p: '$5.50', pct: 68.5 },
    { p: '$5.00', pct: 100 },
    { p: '$4.50', pct: 84.2 },
    { p: '$4.00', pct: 12.4 },
  ];
  return (
    <RailCard title="What price will $WHALE hit in April?" right={
      <span style={{ fontSize: 11, color: C.textMute }}>Polymarket</span>
    }>
      <div>
        {rows.map((r, i) => (
          <div key={r.p} style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 48px',
            gap: 10, padding: '10px 0', alignItems: 'center', fontSize: 12.5,
            borderTop: i === 0 ? 'none' : `1px solid ${C.lineSoft}`,
          }}>
            <span style={{ color: C.text, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{r.p}</span>
            <div style={{ height: 5, borderRadius: 3, background: C.bg3, overflow: 'hidden' }}>
              <div style={{ width: `${r.pct}%`, height: '100%', background: C.text, opacity: 0.75 }}/>
            </div>
            <span style={{ color: C.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{r.pct}%</span>
          </div>
        ))}
      </div>
    </RailCard>
  );
}

// ============================================================
// MARKETS
// ============================================================
function MarketsSection() {
  const markets = [
    { ex: 'Binance', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8241, spread: 0.01, depthP: '$30,483,170', depthM: '$22,780,247', vol: '$1,481,258,665', share: 3.2 },
    { ex: 'Bybit', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8149, spread: 0.01, depthP: '$8,168,633', depthM: '$7,389,261', vol: '$1,161,026,951', share: 2.51 },
    { ex: 'Coinbase', pair: 'WHALE/USD', kind: 'CEX', price: 4.8253, spread: 0.01, depthP: '$33,305,962', depthM: '$19,282,041', vol: '$734,891,864', share: 1.59 },
    { ex: 'OKX', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8149, spread: 0.01, depthP: '$16,683,209', depthM: '$11,729,746', vol: '$505,009,275', share: 1.09 },
    { ex: 'Gate', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8131, spread: 0.01, depthP: '$9,331,692', depthM: '$9,008,507', vol: '$515,218,835', share: 1.11 },
    { ex: 'Kraken', pair: 'WHALE/USD', kind: 'CEX', price: 4.8117, spread: 0.01, depthP: '$23,127,251', depthM: '$21,455,963', vol: '$184,992,740', share: 0.4 },
    { ex: 'Uniswap', pair: 'WHALE/ETH', kind: 'DEX', price: 4.8100, spread: 0.02, depthP: '$3,896,065', depthM: '$4,726,591', vol: '$326,891,789', share: 0.71 },
    { ex: 'MEXC', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8131, spread: 0.01, depthP: '$5,054,011', depthM: '$5,382,616', vol: '$540,076,043', share: 1.17 },
    { ex: 'Aerodrome', pair: 'WHALE/WETH', kind: 'DEX', price: 4.8170, spread: 0.01, depthP: '$13,035,242', depthM: '$7,570,867', vol: '$665,082,253', share: 1.44 },
    { ex: 'BingX', pair: 'WHALE/USDT', kind: 'CEX', price: 4.8142, spread: 0.01, depthP: '$18,856,234', depthM: '$18,962,219', vol: '$347,965,632', share: 0.75 },
  ];
  const [typeFilter, setTypeFilter] = React.useState('All');
  const [segFilter, setSegFilter] = React.useState('Spot');

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: C.text }}>Whalescoin Markets</h2>
          <div style={{ fontSize: 11.5, color: C.textMute, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>All pairs · Live</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <SegPill items={['All', 'CEX', 'DEX']} active={typeFilter} onSelect={setTypeFilter}/>
          <SegPill items={['Spot', 'Perpetuals', 'Futures']} active={segFilter} onSelect={setSegFilter}/>
        </div>
      </div>

      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${C.line}`, background: C.bg2,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1.5fr 1fr 90px 1fr 1fr 1fr 1fr 80px 80px',
          gap: 14, padding: '12px 20px', fontSize: 11, color: C.textMute,
          textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <span>#</span>
          <span>Exchange</span>
          <span>Pair</span>
          <span style={{ textAlign: 'right' }}>Price</span>
          <span style={{ textAlign: 'right' }}>Spread</span>
          <span style={{ textAlign: 'right' }}>+2% Depth</span>
          <span style={{ textAlign: 'right' }}>-2% Depth</span>
          <span style={{ textAlign: 'right' }}>24h Volume</span>
          <span style={{ textAlign: 'right' }}>Volume %</span>
          <span style={{ textAlign: 'right' }}>Updated</span>
        </div>
        {markets.map((m, i) => (
          <MarketRow key={i} m={m} i={i} last={i === markets.length - 1}/>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, fontSize: 12.5, color: C.textDim }}>
        <span>Showing 1 to 10 of 2,456 results</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {['‹', '1', '2', '3', '4', '5', '…', '246', '›'].map((p, i) => (
            <button key={i} style={{
              minWidth: 30, height: 30, borderRadius: 7,
              background: p === '1' ? C.text : 'transparent',
              color: p === '1' ? C.bg : C.textDim,
              border: p === '1' ? 'none' : `1px solid ${C.line}`,
              fontFamily: MONO, fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketRow({ m, i, last }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: 'grid', gridTemplateColumns: '40px 1.5fr 1fr 90px 1fr 1fr 1fr 1fr 80px 80px',
      gap: 14, padding: '14px 20px', alignItems: 'center', fontSize: 12.5,
      background: hover ? C.bg3 : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${C.lineSoft}`,
      transition: 'background 0.1s',
    }}>
      <span style={{ color: C.textMute }}>{i + 1}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: C.text, color: C.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700,
        }}>{m.ex[0]}</div>
        <span style={{ color: C.text, fontWeight: 500 }}>{m.ex}</span>
        <span style={{
          padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
          color: C.textDim, background: C.bg3, border: `1px solid ${C.line}`,
        }}>{m.kind}</span>
      </div>
      <span style={{ color: C.text, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        {m.pair} <span style={{ color: C.textMute }}>↗</span>
      </span>
      <span style={{ color: C.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>${m.price.toFixed(2)}</span>
      <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{m.spread.toFixed(2)}%</span>
      <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{m.depthP}</span>
      <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{m.depthM}</span>
      <span style={{ color: C.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{m.vol}</span>
      <span style={{ color: C.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{m.share.toFixed(2)}%</span>
      <span style={{ color: C.textMute, textAlign: 'right', fontSize: 11.5 }}>Recently</span>
    </div>
  );
}

function SegPill({ items, active, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 10, background: C.bg3, border: `1px solid ${C.line}` }}>
      {items.map(it => {
        const on = it === active;
        return (
          <button key={it} onClick={() => onSelect?.(it)} style={{
            padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
            background: on ? C.text : 'transparent',
            color: on ? C.bg : C.textDim,
            fontSize: 12, fontWeight: on ? 600 : 500, fontFamily: MONO,
          }}>{it}</button>
        );
      })}
    </div>
  );
}

// ============================================================
// NEWS
// ============================================================
function NewsSection() {
  const news = [
    { src: 'Whalescoin Blog', t: '15m', title: 'Whalescoin v2 launches on Base — tipping gas drops 94%', tag: 'Product' },
    { src: 'The Defiant', t: '2h', title: '$WHALE triples weekly volume as Cetacea moves 12,400 ETH to cold storage', tag: 'Markets' },
    { src: 'Blockworks', t: '5h', title: 'Analysis: why "social whale graphs" may be crypto\'s next discovery layer', tag: 'Research' },
    { src: 'CoinDesk', t: '1d', title: 'Circle integrates $WHALE for creator-payout programs across Base and Arbitrum', tag: 'Partnership' },
    { src: 'Unchained', t: '2d', title: 'Whalescoin hits 180K addresses — here\'s who is actually posting on-chain', tag: 'Data' },
    { src: 'Decrypt', t: '3d', title: 'Whalescoin governance passes WIP-14: treasury to allocate 8M $WHALE to LPs', tag: 'Governance' },
  ];
  return (
    <section>
      <h2 style={{ margin: '0 0 18px', fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: C.text }}>News & updates</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {news.map((n, i) => (
          <article key={i} style={{
            padding: 20, borderRadius: 14, background: C.bg2, border: `1px solid ${C.line}`,
            cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14,
            minHeight: 180,
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,243,235,0.18)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.line}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: C.textMute, textTransform: 'uppercase', letterSpacing: 0.6 }}>
              <span>{n.src}</span>
              <span>·</span>
              <span>{n.t}</span>
              <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 5, color: C.text, background: C.bg3, border: `1px solid ${C.line}`, letterSpacing: 0.5, fontWeight: 600 }}>
                {n.tag}
              </span>
            </div>
            <h3 style={{
              margin: 0, fontSize: 17, lineHeight: 1.3, color: C.text, fontWeight: 500,
              letterSpacing: -0.2, textWrap: 'pretty', flex: 1,
            }}>{n.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.textDim }}>
              Read article →
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// SIMILAR COINS
// ============================================================
function SimilarSection() {
  const coins = [
    { name: 'Orcacoin', sym: 'ORCA', rank: 58, price: 2.18, chg: 4.2, mc: '890M', spark: [1,2,3,2,3,4,5,4,6,5,7,6,8] },
    { name: 'Krakenbit', sym: 'KRB', rank: 71, price: 0.842, chg: -2.1, mc: '412M', spark: [6,5,6,5,4,3,4,3,2,3,2,3,2] },
    { name: 'Narwhal', sym: 'NAR', rank: 84, price: 8.21, chg: 12.4, mc: '308M', spark: [1,2,2,3,4,5,6,7,8,7,9,8,10] },
    { name: 'Sperm', sym: 'SPRM', rank: 96, price: 0.104, chg: 18.9, mc: '182M', spark: [1,1,2,3,5,6,7,8,9,8,10,11,12] },
    { name: 'Beluga', sym: 'BLU', rank: 108, price: 1.48, chg: -0.8, mc: '148M', spark: [4,5,4,3,4,3,4,3,4,4,5,4,4] },
    { name: 'Minke', sym: 'MNK', rank: 142, price: 0.242, chg: 6.1, mc: '72M', spark: [2,3,3,4,3,4,5,4,6,5,6,6,7] },
  ];
  return (
    <section>
      <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: C.text }}>Similar coins</h2>
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 20, maxWidth: 600 }}>
        Projects held by the same wallets as $WHALE, tagged with the social / signal narrative.
      </div>

      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${C.line}`, background: C.bg2,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1.5fr 90px 1fr 1fr 1fr 140px 90px',
          gap: 14, padding: '12px 20px', fontSize: 11, color: C.textMute,
          textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <span>#</span><span>Coin</span><span>Rank</span>
          <span style={{ textAlign: 'right' }}>Price</span>
          <span style={{ textAlign: 'right' }}>24h</span>
          <span style={{ textAlign: 'right' }}>Market cap</span>
          <span style={{ textAlign: 'right' }}>Last 24h</span>
          <span/>
        </div>
        {coins.map((c, i) => <SimilarRow key={c.sym} c={c} i={i} last={i === coins.length - 1}/>)}
      </div>
    </section>
  );
}

function SimilarRow({ c, i, last }) {
  const up = c.chg >= 0;
  const col = up ? C.up : C.down;
  const W = 120, H = 36;
  const max = Math.max(...c.spark), min = Math.min(...c.spark);
  const xs = j => (j / (c.spark.length - 1)) * W;
  const ys = v => H - 4 - ((v - min) / (max - min || 1)) * (H - 8);
  const line = c.spark.map((v, j) => `${j === 0 ? 'M' : 'L'}${xs(j)},${ys(v)}`).join(' ');
  const [hover, setHover] = React.useState(false);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: 'grid', gridTemplateColumns: '40px 1.5fr 90px 1fr 1fr 1fr 140px 90px',
      gap: 14, padding: '14px 20px', alignItems: 'center', fontSize: 13, cursor: 'pointer',
      background: hover ? C.bg3 : 'transparent',
      borderBottom: last ? 'none' : `1px solid ${C.lineSoft}`,
      transition: 'background 0.1s',
    }}>
      <span style={{ color: C.textMute }}>{i + 1}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, background: C.text, color: C.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
        }}>{c.sym[0]}</div>
        <div>
          <div style={{ color: C.text, fontWeight: 500 }}>{c.name}</div>
          <div style={{ color: C.textMute, fontSize: 11, marginTop: 1 }}>{c.sym}</div>
        </div>
      </div>
      <span style={{ color: C.textDim, fontSize: 12 }}>#{c.rank}</span>
      <span style={{ color: C.text, textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
        ${c.price < 1 ? c.price.toFixed(3) : c.price.toFixed(2)}
      </span>
      <span style={{ color: col, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
        {up ? '▲' : '▼'} {Math.abs(c.chg).toFixed(1)}%
      </span>
      <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${c.mc}</span>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id={`sp-${c.sym}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={col} stopOpacity="0.25"/>
              <stop offset="1" stopColor={col} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={line + ` L${W},${H} L0,${H} Z`} fill={`url(#sp-${c.sym})`}/>
          <path d={line} fill="none" stroke={col} strokeWidth="1.3"/>
        </svg>
      </div>
      <div style={{ textAlign: 'right' }}>
        <button style={{
          padding: '6px 10px', borderRadius: 8, border: `1px solid ${C.line}`,
          background: C.bg3, color: C.text, fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
          fontFamily: MONO,
        }}>View</button>
      </div>
    </div>
  );
}

// ============================================================
// HISTORICAL DATA
// ============================================================
function HistoricalSection() {
  const rows = [];
  const basePx = 4.82;
  for (let i = 0; i < 10; i++) {
    const d = new Date(2026, 3, 22 - i);
    const open = basePx - i * 0.05 + (i % 2 === 0 ? 0.04 : -0.02);
    const close = open + (i % 3 === 0 ? 0.08 : -0.06);
    const high = Math.max(open, close) + 0.12;
    const low = Math.min(open, close) - 0.14;
    const vol = 280_000_000 + i * 4_800_000;
    const mc = 2_184_920_000 - i * 2_100_000;
    rows.push({
      date: d.toDateString().slice(4),
      open: open.toFixed(4), high: high.toFixed(4), low: low.toFixed(4), close: close.toFixed(4),
      vol: '$' + vol.toLocaleString(),
      mc: '$' + mc.toLocaleString(),
    });
  }
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: C.text }}>Historical data</h2>
          <div style={{ fontSize: 11.5, color: C.textMute, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>Last 10 days</div>
        </div>
        <button style={{
          padding: '8px 14px', borderRadius: 10, border: `1px solid ${C.line}`,
          background: C.bg3, color: C.text, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: MONO,
        }}>Download CSV ↓</button>
      </div>
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${C.line}`, background: C.bg2,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr',
          gap: 14, padding: '12px 20px', fontSize: 11, color: C.textMute,
          textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <span>Date</span>
          <span style={{ textAlign: 'right' }}>Open</span>
          <span style={{ textAlign: 'right' }}>High</span>
          <span style={{ textAlign: 'right' }}>Low</span>
          <span style={{ textAlign: 'right' }}>Close</span>
          <span style={{ textAlign: 'right' }}>Volume</span>
          <span style={{ textAlign: 'right' }}>Market cap</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr',
            gap: 14, padding: '14px 20px', alignItems: 'center', fontSize: 12.5,
            borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${C.lineSoft}`,
          }}>
            <span style={{ color: C.text }}>{r.date}</span>
            <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${r.open}</span>
            <span style={{ color: C.up, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${r.high}</span>
            <span style={{ color: C.down, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${r.low}</span>
            <span style={{ color: C.text, textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>${r.close}</span>
            <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.vol}</span>
            <span style={{ color: C.textDim, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.mc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { CoinPage });
