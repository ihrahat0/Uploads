// rightrail.jsx — Right column: search, whale tape, who to follow, trending topics

function RightRail() {
  return (
    <aside style={{
      width: 340, flexShrink: 0, padding: '16px 20px 40px',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <SearchBar/>
      <WhaleTape/>
      <SuggestedFollows/>
      <TrendingTopics/>
      <Footer/>
    </aside>
  );
}

function SearchBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 14px', borderRadius: 14,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {Icon.search(16, 'rgba(244,243,255,0.4)')}
      <input placeholder="Search posts, coins, people…" style={{
        flex: 1, background: 'none', border: 'none', outline: 'none',
        color: '#F4F3FF', fontSize: 13, fontFamily: 'inherit',
      }}/>
      <kbd style={{
        padding: '1px 6px', fontSize: 10, borderRadius: 4,
        background: 'rgba(255,255,255,0.06)', color: 'rgba(244,243,255,0.5)',
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontWeight: 500,
      }}>⌘K</kbd>
    </div>
  );
}

function RailCard({ title, subtitle, children, accent }) {
  return (
    <div style={{
      borderRadius: 18, overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
    }}>
      {accent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
        }}/>
      )}
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{
          margin: 0, fontFamily: '"Instrument Serif", serif',
          fontSize: 18, fontWeight: 400, color: '#F4F3FF', letterSpacing: -0.2,
          whiteSpace: 'nowrap',
        }}>{title}</h3>
        {subtitle && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: accent || 'rgba(244,243,255,0.4)', textTransform: 'uppercase' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function WhaleTape() {
  return (
    <RailCard title="Whale tape" subtitle="Live" accent="#9E7CFF">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {WHALE_MOVES.map((w, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px', minWidth: 0,
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9, flexShrink: 0,
              background: w.kind === 'buy' ? 'rgba(61,255,158,0.12)' : 'rgba(255,92,138,0.12)',
              color: w.kind === 'buy' ? '#3DFF9E' : '#FF5C8A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${w.kind === 'buy' ? 'rgba(61,255,158,0.25)' : 'rgba(255,92,138,0.25)'}`,
            }}>
              {w.kind === 'buy' ? Icon.arrowUp(13) : Icon.arrowDown(13)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#F4F3FF', fontWeight: 600, whiteSpace: 'nowrap' }}>
                <CoinIcon sym={w.sym} size={14}/>
                <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.amt}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.45)', fontFamily: 'Geist Mono, ui-monospace, monospace', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span style={{ color: w.kind === 'buy' ? '#3DFF9E' : '#FF5C8A', fontWeight: 600 }}>{w.kind === 'buy' ? 'Bought' : 'Sold'}</span> · {w.addr} · {w.time}
              </div>
            </div>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13, fontWeight: 600, color: '#F4F3FF', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
              {w.usd}
            </div>
          </div>
        ))}
        <button style={{
          padding: '12px 16px', background: 'none', border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          color: '#9E7CFF', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
        }}>View full tape →</button>
      </div>
    </RailCard>
  );
}

function SuggestedFollows() {
  return (
    <RailCard title="Who to follow" accent="#5CC9FF">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SUGGESTED.map((s, i) => (
          <div key={s.handle} style={{
            display: 'flex', alignItems: 'center', gap: 11, padding: '10px 16px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
              color: '#fff', fontFamily: '"Instrument Serif", serif',
              fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 14px ${s.color}40`,
            }}>{s.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F4F3FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                {s.verified && Icon.verified(12)}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.5)' }}>
                {s.handle} · <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}>{s.followers}</span>
              </div>
            </div>
            <FollowBtn/>
          </div>
        ))}
        <button style={{
          padding: '12px 16px', background: 'none', border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          color: '#9E7CFF', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
        }}>Show more →</button>
      </div>
    </RailCard>
  );
}

function FollowBtn() {
  const [following, setFollowing] = React.useState(false);
  return (
    <button onClick={() => setFollowing(f => !f)} style={{
      padding: '6px 14px', borderRadius: 14, fontSize: 12, fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.15s',
      border: following ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
      background: following ? 'transparent' : 'linear-gradient(135deg, #F4F3FF, #C9C6E0)',
      color: following ? '#F4F3FF' : '#0B0A14',
    }}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
}

function TrendingTopics() {
  return (
    <RailCard title="Trending in crypto" accent="#FFC45C">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {TRENDING_TOPICS.map((t, i) => (
          <div key={i} style={{
            padding: '11px 16px', borderTop: '1px solid rgba(255,255,255,0.04)',
            cursor: 'pointer', transition: 'background 0.15s',
          }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.45)', fontWeight: 500, marginBottom: 2 }}>{t.tag}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F4F3FF', display: 'flex', alignItems: 'center', gap: 6 }}>
              {t.topic}
              {t.hot && Icon.flame(12)}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.5)', marginTop: 3, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>{t.posts}</div>
          </div>
        ))}
      </div>
    </RailCard>
  );
}

function Footer() {
  return (
    <div style={{ padding: '4px 4px', display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: 11, color: 'rgba(244,243,255,0.4)' }}>
      {['Terms', 'Privacy', 'Cookies', 'Docs', 'API', 'Status', '© 2026 WhalesCoin'].map(x => (
        <span key={x} style={{ cursor: 'pointer' }}>{x}</span>
      ))}
    </div>
  );
}

Object.assign(window, { RightRail });
