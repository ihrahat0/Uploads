// app.jsx — Root composition

function App() {
  const [tab, setTab] = React.useState('foryou');
  const [activeNav, setActiveNav] = React.useState('discover');
  const [liked, setLiked] = React.useState(new Set([1]));
  const [bookmarked, setBookmarked] = React.useState(new Set());
  const [composerOpen, setComposerOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('wc_state') || '{}');
      if (s.tab) setTab(s.tab);
      if (s.nav) setActiveNav(s.nav);
      if (s.liked) setLiked(new Set(s.liked));
      if (s.bookmarked) setBookmarked(new Set(s.bookmarked));
    } catch {}
  }, []);
  React.useEffect(() => {
    localStorage.setItem('wc_state', JSON.stringify({
      tab, nav: activeNav, liked: [...liked], bookmarked: [...bookmarked],
    }));
  }, [tab, activeNav, liked, bookmarked]);

  const toggleLike = (id) => setLiked(s => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const toggleBookmark = (id) => setBookmarked(s => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  return (
    <div data-screen-label="WhalesCoin · Discover" style={{
      minHeight: '100vh', color: '#F4F3FF',
      fontFamily: 'Geist, -apple-system, system-ui, sans-serif',
      background: '#06060C',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient background — subtle aurora */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 800px 600px at 15% -5%, rgba(124,92,255,0.18), transparent 60%),
          radial-gradient(ellipse 700px 500px at 110% 20%, rgba(91,63,255,0.12), transparent 60%),
          radial-gradient(ellipse 900px 700px at 50% 110%, rgba(40,30,80,0.3), transparent 70%)
        `,
      }}/>

      <div style={{
        display: 'flex', position: 'relative', zIndex: 1,
        maxWidth: 1440, margin: '0 auto', minWidth: 1280,
      }}>
        <Sidebar active={activeNav} onNav={setActiveNav}/>
        <Feed
          tab={tab} setTab={setTab}
          liked={liked} onLike={toggleLike}
          bookmarked={bookmarked} onBookmark={toggleBookmark}
          composerOpen={composerOpen} setComposerOpen={setComposerOpen}/>
        <RightRail/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
