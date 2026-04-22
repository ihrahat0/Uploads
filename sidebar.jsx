// sidebar.jsx — Left navigation rail

function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 260, flexShrink: 0, padding: '20px 16px 16px',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', gap: 4,
      position: 'sticky', top: 0, height: '100vh', overflow: 'hidden auto',
      background: 'linear-gradient(180deg, #0B0A14 0%, #08070F 100%)',
    }}>
      <div style={{ padding: '4px 10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <WhalesCoinLogo size={26}/>
      </div>

      {/* Profile chip */}
      <div style={{
        padding: '10px 12px', marginBottom: 10,
        background: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(124,92,255,0.04))',
        border: '1px solid rgba(124,92,255,0.2)',
        borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'linear-gradient(135deg, #7C5CFF, #5B3FFF)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 14, fontFamily: '"Instrument Serif", serif',
          position: 'relative',
        }}>
          A
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: 5, background: '#3DFF9E', boxShadow: '0 0 0 2px #0B0A14' }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F4F3FF' }}>Ayo Kemp</div>
          <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.5)' }}>@ayo · $4,212.80</div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(n => (
          <NavItem key={n.k} item={n} active={active === n.k} onClick={() => onNav(n.k)}/>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '14px 10px' }}/>

      {/* New Post CTA */}
      <button style={{
        padding: '13px 14px', borderRadius: 14, border: 'none',
        background: 'linear-gradient(135deg, #7C5CFF, #5B3FFF)',
        color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 10px 30px rgba(91,63,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
         onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {Icon.plus(16, '#fff')} New Post
      </button>

      <div style={{ flex: 1 }}/>

      {/* Wallet summary footer */}
      <div style={{
        padding: 12, marginTop: 10,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(244,243,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
          <span>Wallet</span>
          <span style={{ color: '#3DFF9E' }}>+3.2%</span>
        </div>
        <div style={{ fontFamily: 'Geist, system-ui', fontSize: 20, fontWeight: 600, color: '#F4F3FF', fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>
          $4,212<span style={{ opacity: 0.5 }}>.80</span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(244,243,255,0.4)', marginTop: 2 }}>
          1.29 ETH · 842 WHALE
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 10,
        border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
        background: active ? 'rgba(124,92,255,0.12)' : hover ? 'rgba(255,255,255,0.04)' : 'transparent',
        color: active ? '#F4F3FF' : 'rgba(244,243,255,0.7)',
        fontSize: 14, fontWeight: active ? 600 : 500,
        position: 'relative',
        transition: 'background 0.15s, color 0.15s',
      }}>
      {active && (
        <div style={{ position: 'absolute', left: -16, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'linear-gradient(180deg, #9E7CFF, #5B3FFF)' }}/>
      )}
      <span style={{ color: active ? '#9E7CFF' : item.special ? '#FFC45C' : item.live ? '#FF5C8A' : 'rgba(244,243,255,0.55)', display: 'flex' }}>
        {Icon[item.icon](20)}
      </span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && (
        <span style={{
          padding: '1px 7px', borderRadius: 10, fontSize: 10, fontWeight: 700,
          background: '#7C5CFF', color: '#fff', fontVariantNumeric: 'tabular-nums',
        }}>{item.badge}</span>
      )}
      {item.live && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#FF5C8A' }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#FF5C8A', boxShadow: '0 0 8px #FF5C8A', animation: 'wc_pulse 1.4s ease-in-out infinite' }}/>
          LIVE
        </span>
      )}
    </button>
  );
}

Object.assign(window, { Sidebar });
