// data.jsx — Mock data for WhalesCoin feed

const TRENDING = [
  { sym: 'ETH', price: 3247.82, chg: 2.4 },
  { sym: 'BTC', price: 68412.00, chg: 1.2 },
  { sym: 'SOL', price: 182.45, chg: 5.8 },
  { sym: 'BONK', price: 0.0000342, chg: -3.1 },
  { sym: 'WHALE', price: 4.82, chg: 12.6 },
  { sym: 'ARB', price: 1.24, chg: -0.8 },
  { sym: 'WIF', price: 2.87, chg: 8.4 },
  { sym: 'TON', price: 6.42, chg: 3.2 },
];

const NAV = [
  { k: 'discover', label: 'Discover', icon: 'compass', active: true },
  { k: 'following', label: 'Following', icon: 'users' },
  { k: 'explore', label: 'Explore', icon: 'search' },
  { k: 'signals', label: 'Signals', icon: 'pulse', badge: 3 },
  { k: 'wallet', label: 'Wallet', icon: 'wallet' },
  { k: 'wai', label: 'WAI', icon: 'sparkles', special: true },
  { k: 'golive', label: 'Go Live', icon: 'radio', live: true },
  { k: 'bookmarks', label: 'Bookmarks', icon: 'bookmark' },
  { k: 'messages', label: 'Messages', icon: 'chat', badge: 12 },
  { k: 'notifications', label: 'Notifications', icon: 'bell' },
  { k: 'settings', label: 'Settings', icon: 'cog' },
];

const POSTS = [
  {
    id: 1,
    author: { name: 'Cetacea', handle: '@cetacea.eth', avatar: 'C', color: '#7C5CFF', tier: 'megawhale', verified: true },
    time: '2h',
    badge: 'WHALE ALERT',
    content: 'Moved 12,400 ETH out of Binance into cold storage. Not selling — just taking self-custody seriously before the halving noise.',
    coins: [{ sym: 'ETH', chg: 2.4 }],
    sentiment: 'bullish',
    stats: { replies: 284, reposts: 1200, likes: 4800, views: '412K', tips: 128 },
    liked: true,
    chart: true,
  },
  {
    id: 2,
    author: { name: 'Maya Okonkwo', handle: '@maya', avatar: 'M', color: '#FF8A5C', tier: 'analyst' },
    time: '4h',
    reposted: null,
    content: "ETH/BTC ratio breaking down through the 2022 lows. Either the greatest accumulation zone of the cycle or we're genuinely in regime change. I'm leaning accumulation but sizing small.",
    coins: [{ sym: 'ETH', chg: 2.4 }, { sym: 'BTC', chg: 1.2 }],
    sentiment: 'neutral',
    stats: { replies: 142, reposts: 389, likes: 2100, views: '188K', tips: 47 },
  },
  {
    id: 3,
    author: { name: 'whaleclub', handle: '@whaleclub', avatar: 'W', color: '#5CC9FF', tier: 'official', verified: true },
    time: '5h',
    badge: 'ANNOUNCEMENT',
    content: 'New this week on WhalesCoin — on-chain alerts, co-authored threads, and tip-to-author in $WHALE. Tap the bell on any post to get notified when a whale moves.',
    coins: [{ sym: 'WHALE', chg: 12.6 }],
    sentiment: null,
    stats: { replies: 421, reposts: 2400, likes: 8900, views: '1.2M', tips: 312 },
  },
  {
    id: 4,
    author: { name: 'Ih Rahat', handle: '@ihrahat', avatar: 'R', color: '#5CFFB0', tier: 'member' },
    time: '6h',
    reposted: { by: 'Lukas Vogt', handle: '@lukas' },
    content: "Did anyone actually use the new TeraFab drop today? Curious what the UX felt like — my bridge transaction is stuck pending for 40min.",
    coins: [],
    sentiment: null,
    stats: { replies: 58, reposts: 12, likes: 176, views: '14K', tips: 6 },
  },
  {
    id: 5,
    author: { name: 'DeepLiquidity', handle: '@deepliq', avatar: 'D', color: '#FFC45C', tier: 'trader' },
    time: '8h',
    content: "Quiet Sunday. Funding flat across majors, perp OI trending down, stablecoin inflows off their highs. Nothing screams risk-on, nothing screams capitulation. Chop city until the Fed speaks Wednesday.",
    coins: [{ sym: 'ETH', chg: 2.4 }, { sym: 'SOL', chg: 5.8 }],
    sentiment: 'bearish',
    stats: { replies: 89, reposts: 241, likes: 1500, views: '98K', tips: 24 },
  },
];

const SUGGESTED = [
  { name: 'Danniel Marko', handle: '@dannmark', avatar: 'DM', color: '#7C5CFF', bio: 'DeFi researcher', followers: '24.1K' },
  { name: 'Rakib Haque', handle: '@rakib', avatar: 'RA', color: '#FF5C8A', bio: 'On-chain sleuth', followers: '8.9K' },
  { name: 'Orca OTC', handle: '@orca', avatar: 'OC', color: '#5CC9FF', bio: 'Large-size liquidity', followers: '112K', verified: true },
];

const TRENDING_TOPICS = [
  { tag: 'Crypto · Trending', topic: 'ETH halving narrative', posts: '128K posts' },
  { tag: 'DeFi', topic: 'Restaking risk', posts: '54K posts' },
  { tag: 'Culture', topic: '$WHALE hits ATH', posts: '34K posts', hot: true },
  { tag: 'L2 · Trending', topic: 'Base sequencer outage', posts: '18K posts' },
];

const WHALE_MOVES = [
  { kind: 'buy', sym: 'ETH', amt: '12,400 ETH', usd: '$40.2M', addr: '0x7f3b…dc4a', time: '2m' },
  { kind: 'sell', sym: 'WIF', amt: '890K WIF', usd: '$2.55M', addr: '0x2c9a…71ee', time: '14m' },
  { kind: 'buy', sym: 'SOL', amt: '48K SOL', usd: '$8.76M', addr: '0x8fa2…9c31', time: '38m' },
];

Object.assign(window, { TRENDING, NAV, POSTS, SUGGESTED, TRENDING_TOPICS, WHALE_MOVES });
