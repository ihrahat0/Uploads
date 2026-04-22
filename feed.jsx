// feed.jsx — Center column: trending ticker, tabs, composer, posts

function Feed({ tab, setTab, liked, onLike, bookmarked, onBookmark, composerOpen, setComposerOpen }) {
  return (
    <main style={{
      flex: 1, maxWidth: 680, minWidth: 0,
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>
      <FeedHeader tab={tab} setTab={setTab}/>
      <TrendingTicker/>
      <Composer open={composerOpen} setOpen={setComposerOpen}/>
      <div>
        {POSTS.map(p => (
          <Post key={p.id} post={p}
            liked={liked.has(p.id)} onLike={() => onLike(p.id)}
            bookmarked={bookmarked.has(p.id)} onBookmark={() => onBookmark(p.id)}/>
        ))}
      </div>
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(244,243,255,0.35)', fontSize: 13 }}>
        You're all caught up ·{' '}
        <span style={{ color: '#9E7CFF', cursor: 'pointer' }}>Show older</span>
      </div>
    </main>
  );
}

function FeedHeader({ tab, setTab }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      background: 'rgba(8,7,15,0.72)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, letterSpacing: -0.3, color: '#F4F3FF' }}>Discover</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(244,243,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#3DFF9E', boxShadow: '0 0 8px #3DFF9E', animation: 'wc_pulse 1.6s ease-in-out infinite' }}/>
          Live
        </div>
      </div>
      <div style={{ display: 'flex', padding: '12px 24px 0', gap: 28, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
        {['foryou', 'following', 'whales', 'news'].map(k => {
          const label = { foryou: 'For you', following: 'Following', whales: 'Whale tape', news: 'News' }[k];
          const active = tab === k;
          return (
            <button key={k} onClick={() => setTab(k)} style={{
              background: 'none', border: 'none', padding: '8px 0 14px',
              fontSize: 14, fontWeight: active ? 600 : 500,
              color: active ? '#F4F3FF' : 'rgba(244,243,255,0.55)',
              cursor: 'pointer', position: 'relative',
              transition: 'color 0.15s',
            }}>
              {label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #9E7CFF, #5B3FFF)',
                  boxShadow: '0 0 10px #7C5CFF',
                }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrendingTicker() {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '10px 0',
      background: 'linear-gradient(90deg, rgba(124,92,255,0.05), transparent 50%, rgba(91,63,255,0.04))',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', gap: 28, padding: '0 24px', overflowX: 'auto', scrollbarWidth: 'none' }} className="no-scroll">
        {TRENDING.map(c => (
          <div key={c.sym} style={{
            display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
            fontSize: 13, cursor: 'pointer',
          }}>
            <CoinIcon sym={c.sym} size={18}/>
            <span style={{ color: '#F4F3FF', fontWeight: 600 }}>{c.sym}</span>
            <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', color: 'rgba(244,243,255,0.7)', fontVariantNumeric: 'tabular-nums' }}>
              ${c.price < 0.01 ? c.price.toFixed(7) : c.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
            <span style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace',
              color: c.chg >= 0 ? '#3DFF9E' : '#FF5C8A',
              fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 2,
            }}>
              {c.chg >= 0 ? Icon.arrowUp(9) : Icon.arrowDown(9)}
              {Math.abs(c.chg).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Composer({ open, setOpen }) {
  const [text, setText] = React.useState('');
  return (
    <div style={{
      padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', gap: 14,
    }}>
      <div style={{
        width: 40, height: 40, flexShrink: 0, borderRadius: 14,
        background: 'linear-gradient(135deg, #7C5CFF, #5B3FFF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: '"Instrument Serif", serif', fontSize: 18, fontWeight: 600,
      }}>A</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="What are you seeing on-chain?"
          rows={open ? 3 : 1}
          style={{
            width: '100%', resize: 'none', border: 'none', outline: 'none',
            background: 'transparent', color: '#F4F3FF',
            fontSize: 16, fontFamily: 'inherit',
            padding: '10px 0', lineHeight: 1.5,
            transition: 'all 0.2s',
          }}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, color: 'rgba(244,243,255,0.55)', flexWrap: 'wrap' }}>
            {[
              ['image', 'Image'],
              ['chartMini', 'Chart'],
              ['coin', '$Ticker'],
              ['ai', 'AI write'],
            ].map(([icon, label]) => (
              <button key={icon} style={{
                padding: '7px 10px', background: 'none', border: 'none', cursor: 'pointer',
                color: icon === 'ai' ? '#FFC45C' : 'inherit',
                borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 5,
                transition: 'background 0.15s, color 0.15s',
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,92,255,0.1)'}
                 onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                {Icon[icon](16)}
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {text.length > 0 && (
              <div style={{
                fontSize: 11, color: text.length > 260 ? '#FFC45C' : 'rgba(244,243,255,0.4)',
                fontFamily: 'Geist Mono, ui-monospace, monospace',
              }}>{280 - text.length}</div>
            )}
            <button disabled={text.length === 0} style={{
              padding: '8px 18px', borderRadius: 20, border: 'none',
              background: text.length === 0 ? 'rgba(124,92,255,0.3)' : 'linear-gradient(135deg, #7C5CFF, #5B3FFF)',
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: text.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow: text.length === 0 ? 'none' : '0 6px 18px rgba(91,63,255,0.4)',
              transition: 'all 0.15s',
            }}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Post({ post, liked, onLike, bookmarked, onBookmark }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: hover ? 'rgba(255,255,255,0.015)' : 'transparent',
        transition: 'background 0.15s', cursor: 'pointer',
      }}>
      {post.reposted && (
        <div style={{
          fontSize: 12, color: 'rgba(244,243,255,0.5)', marginBottom: 8, marginLeft: 54,
          display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
        }}>
          {Icon.repost(13)}
          <span>{post.reposted.by} reposted</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 14 }}>
        <Avatar a={post.author}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: '#F4F3FF', fontSize: 15 }}>{post.author.name}</span>
            {post.author.verified && Icon.verified(14)}
            <TierBadge tier={post.author.tier}/>
            <span style={{ color: 'rgba(244,243,255,0.45)', fontSize: 14 }}>{post.author.handle}</span>
            <span style={{ color: 'rgba(244,243,255,0.35)', fontSize: 14 }}>· {post.time}</span>
            <div style={{ flex: 1 }}/>
            <button style={{
              background: 'none', border: 'none', color: 'rgba(244,243,255,0.4)', cursor: 'pointer',
              padding: 4, display: 'flex', borderRadius: 6,
            }} onMouseEnter={e => { e.currentTarget.style.color = '#F4F3FF'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
               onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,243,255,0.4)'; e.currentTarget.style.background = 'none'; }}>
              {Icon.dot3()}
            </button>
          </div>

          {post.badge && <PostBadge badge={post.badge}/>}

          <div style={{
            color: '#E8E6F5', fontSize: 15.5, lineHeight: 1.55, marginTop: 6,
            letterSpacing: -0.1,
          }}>
            {post.content}
          </div>

          {post.coins && post.coins.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {post.coins.map(c => <CoinPill key={c.sym} sym={c.sym} chg={c.chg}/>)}
              {post.sentiment && <SentimentPill kind={post.sentiment}/>}
            </div>
          )}

          {post.chart && <EmbeddedChart/>}

          <PostActions post={post} liked={liked} onLike={onLike} bookmarked={bookmarked} onBookmark={onBookmark}/>
        </div>
      </div>
    </article>
  );
}

function Avatar({ a, size = 42 }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: size * 0.33,
      background: `linear-gradient(135deg, ${a.color}, ${a.color}aa)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: '"Instrument Serif", serif',
      fontSize: size * 0.44, fontWeight: 600,
      boxShadow: `0 6px 18px ${a.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
      position: 'relative',
    }}>{a.avatar}</div>
  );
}

function TierBadge({ tier }) {
  if (!tier || tier === 'member') return null;
  const map = {
    megawhale: { label: 'MEGA WHALE', color: '#9E7CFF', bg: 'rgba(124,92,255,0.14)', border: 'rgba(124,92,255,0.3)' },
    analyst: { label: 'ANALYST', color: '#5CC9FF', bg: 'rgba(92,201,255,0.12)', border: 'rgba(92,201,255,0.28)' },
    trader: { label: 'TRADER', color: '#FFC45C', bg: 'rgba(255,196,92,0.12)', border: 'rgba(255,196,92,0.28)' },
    official: { label: 'OFFICIAL', color: '#3DFF9E', bg: 'rgba(61,255,158,0.1)', border: 'rgba(61,255,158,0.26)' },
  }[tier];
  if (!map) return null;
  return (
    <span style={{
      padding: '2px 7px', borderRadius: 5, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6,
      color: map.color, background: map.bg, border: `1px solid ${map.border}`,
    }}>{map.label}</span>
  );
}

function PostBadge({ badge }) {
  const map = {
    'WHALE ALERT': { c: '#9E7CFF', bg: 'linear-gradient(90deg, rgba(124,92,255,0.18), rgba(124,92,255,0.04))', border: 'rgba(124,92,255,0.25)', icon: Icon.whale },
    'ANNOUNCEMENT': { c: '#3DFF9E', bg: 'linear-gradient(90deg, rgba(61,255,158,0.12), rgba(61,255,158,0.02))', border: 'rgba(61,255,158,0.2)', icon: Icon.zap },
  }[badge];
  if (!map) return null;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 6, marginTop: 8,
      fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
      color: map.c, background: map.bg, border: `1px solid ${map.border}`,
    }}>
      {map.icon(11, map.c)} {badge}
    </div>
  );
}

function CoinPill({ sym, chg }) {
  const up = chg >= 0;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px 4px 4px', borderRadius: 16,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      fontSize: 12, fontWeight: 600, color: '#F4F3FF', cursor: 'pointer',
    }}>
      <CoinIcon sym={sym} size={18}/>
      ${sym}
      <span style={{
        color: up ? '#3DFF9E' : '#FF5C8A', fontFamily: 'Geist Mono, ui-monospace, monospace',
        fontVariantNumeric: 'tabular-nums', fontSize: 11,
      }}>{up ? '+' : ''}{chg.toFixed(1)}%</span>
    </div>
  );
}

function SentimentPill({ kind }) {
  const map = {
    bullish: { label: 'Bullish', c: '#3DFF9E', bg: 'rgba(61,255,158,0.1)', icon: Icon.arrowUp },
    bearish: { label: 'Bearish', c: '#FF5C8A', bg: 'rgba(255,92,138,0.1)', icon: Icon.arrowDown },
    neutral: { label: 'Neutral', c: 'rgba(244,243,255,0.6)', bg: 'rgba(255,255,255,0.04)', icon: null },
  }[kind];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 16,
      background: map.bg, color: map.c, fontSize: 12, fontWeight: 600,
      border: `1px solid ${map.c}30`,
    }}>
      {map.icon && map.icon(10, map.c)} {map.label}
    </div>
  );
}

function EmbeddedChart() {
  // Decorative SVG chart with area gradient
  const pts = [40, 42, 39, 45, 48, 44, 52, 55, 58, 54, 62, 68, 65, 72, 78, 74, 82, 85, 88, 84, 90];
  const W = 600, H = 120;
  const max = Math.max(...pts), min = Math.min(...pts);
  const xs = i => (i / (pts.length - 1)) * W;
  const ys = v => H - 10 - ((v - min) / (max - min)) * (H - 20);
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(v)}`).join(' ');
  const area = line + ` L${W},${H} L0,${H} Z`;
  return (
    <div style={{
      marginTop: 12, borderRadius: 14, overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(124,92,255,0.08), rgba(124,92,255,0.02))',
      border: '1px solid rgba(124,92,255,0.15)',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CoinIcon sym="ETH" size={22}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F4F3FF' }}>Ethereum</div>
            <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.5)' }}>ETH · 24h</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 15, fontWeight: 600, color: '#F4F3FF', fontVariantNumeric: 'tabular-nums', letterSpacing: -0.2 }}>
            $3,247.82
          </div>
          <div style={{ fontSize: 11, color: '#3DFF9E', fontWeight: 600, fontFamily: 'Geist Mono, ui-monospace, monospace' }}>
            +2.4%
          </div>
        </div>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9E7CFF" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#9E7CFF" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#chartGrad)"/>
        <path d={line} fill="none" stroke="#9E7CFF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function PostActions({ post, liked, onLike, bookmarked, onBookmark }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', marginTop: 14, gap: 4,
      color: 'rgba(244,243,255,0.5)',
    }}>
      <ActionBtn icon={Icon.reply} count={post.stats.replies} color="#5CC9FF"/>
      <ActionBtn icon={Icon.repost} count={post.stats.reposts} color="#3DFF9E"/>
      <ActionBtn icon={Icon.heart} count={post.stats.likes + (liked ? 1 : 0)} color="#FF5C8A"
        filled={liked} onClick={onLike}/>
      <ActionBtn icon={Icon.eye} count={post.stats.views} color="#9E7CFF" noHover/>
      <ActionBtn icon={Icon.gift} count={post.stats.tips} color="#FFC45C" label="tip"/>
      <div style={{ flex: 1 }}/>
      <ActionBtn icon={Icon.bookmark} color="#9E7CFF" filled={bookmarked} onClick={onBookmark}/>
      <ActionBtn icon={Icon.share} color="#9E7CFF"/>
    </div>
  );
}

function ActionBtn({ icon, count, color, filled, onClick, noHover, label }) {
  const [hover, setHover] = React.useState(false);
  const active = filled || (hover && !noHover);
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
        background: hover && !noHover ? color + '14' : 'none',
        color: active ? color : 'rgba(244,243,255,0.5)',
        fontSize: 13, fontWeight: 500,
        transition: 'all 0.15s',
        fontFamily: 'inherit',
      }}>
      {icon(17, 'currentColor', filled)}
      {count !== undefined && <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', fontSize: 12 }}>{count}</span>}
    </button>
  );
}

Object.assign(window, { Feed });
