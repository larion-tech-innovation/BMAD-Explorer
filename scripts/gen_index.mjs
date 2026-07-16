import { readdirSync, writeFileSync, readFileSync } from 'fs';

const root = './';

// Build an ignore matcher from .gitignore (falls back to no-op if missing).
const gitignoreToRegExp = (pattern) => {
  // Strip trailing slash (directory marker) and any leading slash (anchor).
  const glob = pattern.replace(/\/$/, '').replace(/^\//, '');
  const source = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape regex specials
    .replace(/\*/g, '.*')                  // glob * -> .*
    .replace(/\?/g, '.');                  // glob ? -> .
  return new RegExp(`^${source}$`);
};

const loadIgnorePatterns = () => {
  try {
    return readFileSync(`${root}/.gitignore`, 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'))
      .map(gitignoreToRegExp);
  } catch {
    return [];
  }
};

const ignorePatterns = loadIgnorePatterns().concat([
  /^.*changelog-.*html$/, // ignore the generated index.html
]);
const ignored = (f) => ignorePatterns.some(re => re.test(f));
const ls = (p) => { try { return readdirSync(p).filter(f => f.endsWith('.html') && !ignored(f)).sort(); } catch { return []; } };

const title = (f) => f.replace(/\.html$/, '')
  .replace(/^skill-bmad-/, '').replace(/^skill-bmad-cis-/, '').replace(/^spp-/, '').replace(/^spp_/, '')
  .replace(/^wds-\d+-/, '').replace(/^agent-/, '').replace(/^bmad-/, '');
//   .replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());


const link = (href, label) => `        <li><a href="${href}" data-name="${label.toLowerCase()}"><span class="ico">${label.trim().charAt(0).toUpperCase()}</span><span class="txt">${label}</span><span class="chev">›</span></a></li>`;

const bmadRoot = ls(`${root}/BMAD`);
const bmadSkills = ls(`${root}/BMAD/bmadskills`);
const cisRoot = ls(`${root}/BMAD_CIS/bmad-cis`);
const cisAgents = ls(`${root}/BMAD_CIS/bmad-cis/cisagents`);
const cisSkills = ls(`${root}/BMAD_CIS/bmad-cis/cisskills`);

const core = bmadSkills.filter(f => f.startsWith('skill-bmad-') && !f.includes('testarch') && !f.includes('tea-'));
const tea  = bmadSkills.filter(f => f.includes('testarch') || f.includes('tea-'));
const spp  = bmadSkills.filter(f => f.startsWith('spp'));
const wds  = bmadSkills.filter(f => f.startsWith('wds-'));

const bmm = bmadRoot.filter(f => f.startsWith('bmad-bmm'));
const changelog = bmadRoot.filter(f => f.startsWith('bmad-changelog'));

const section = (id, heading, sub, groups) => {
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return `
    <section class="card" id="${id}">
      <div class="card-head">
        <h2>${heading}</h2>
        <span class="pill">${total} docs</span>
      </div>
      ${groups.filter(g => g.items.length).map(g => `
      <div class="group">
        <h3>${g.name} <span class="count">${g.items.length}</span></h3>
        <ul>
${g.items.map(i => link(i.href, i.label)).join('\n')}
        </ul>
      </div>`).join('')}
    </section>`;
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BMAD Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f5f7fb; --panel: #ffffff; --border: #e6ebf3;
      --fg: #0f1e33; --muted: #64748b;
      --brand-blue: #0072ce; --brand-blue-dark: #1b4b9b; --brand-red: #e4032e;
      --grad: linear-gradient(135deg, #0072ce, #1b4b9b);
      --shadow: 0 4px 24px rgba(15, 23, 42, .06);
      --nav-h: 64px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; scroll-padding-top: calc(var(--nav-h) + 16px); }
    body {
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: var(--bg); color: var(--fg); line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }

    /* Sticky glass nav */
    nav {
      position: sticky; top: 0; z-index: 50; height: var(--nav-h);
      display: flex; align-items: center; gap: 1rem;
      padding: 0 1.5rem; background: rgba(255, 255, 255, .8);
      backdrop-filter: saturate(180%) blur(12px);
      border-bottom: 1px solid var(--border);
    }
    nav .brand { display: flex; align-items: center; gap: .6rem; font-weight: 700; text-decoration: none;}
    nav .brand img { height: 30px; }
    nav .brand b { color: var(--brand-blue-dark); }
    nav .brand b span { color: var(--brand-red); }
    nav .links { display: flex; gap: .25rem; margin-left: .5rem; }
    nav .links a {
      color: var(--muted); text-decoration: none; font-size: .88rem; font-weight: 500;
      padding: .4rem .7rem; border-radius: 8px; transition: .15s;
    }
    nav .links a:hover { color: var(--brand-blue); background: #eef4fc; }
    nav .search {
      margin-left: auto; position: relative; display: flex; align-items: center;
    }
    nav .search svg { position: absolute; left: .65rem; width: 15px; height: 15px; color: var(--muted); pointer-events: none; }
    nav .search input {
      font: inherit; font-size: .88rem; padding: .5rem .8rem .5rem 2rem;
      border: 1px solid var(--border); border-radius: 999px; background: #f8fafc;
      color: var(--fg); width: 220px; outline: none; transition: .15s;
    }
    nav .search input:focus { border-color: var(--brand-blue); background: #fff; box-shadow: 0 0 0 3px rgba(0,114,206,.12); width: 260px; }

    /* Hero */
    header {
      position: relative; padding: 4rem 1.5rem 3rem; text-align: center; overflow: hidden;
      background:
        radial-gradient(600px circle at 20% 0%, rgba(0,114,206,.10), transparent 60%),
        radial-gradient(500px circle at 85% 20%, rgba(228,3,46,.08), transparent 55%);
    }
    header .logo { height: 88px; width: auto; margin-bottom: 1.5rem; filter: drop-shadow(0 6px 16px rgba(15,23,42,.12)); }
    header h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; letter-spacing: -.02em; color: var(--brand-blue-dark); }
    header h1 span { background: linear-gradient(135deg, var(--brand-red), #ff5a75); -webkit-background-clip: text; background-clip: text; color: transparent; }
    header p { color: var(--muted); margin: .6rem auto 0; font-size: 1.1rem; max-width: 560px; }
    .stats { display: flex; justify-content: center; gap: 2.5rem; margin-top: 2rem; flex-wrap: wrap; }
    .stats div { display: flex; flex-direction: column; }
    .stats b { font-size: 1.8rem; font-weight: 800; color: var(--brand-blue-dark); line-height: 1; }
    .stats small { color: var(--muted); font-size: .8rem; text-transform: uppercase; letter-spacing: .06em; margin-top: .35rem; }

    .wrap { max-width: 1120px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; }
    .card {
      position: relative; background: var(--panel); border: 1px solid var(--border);
      border-radius: 18px; padding: 1.75rem 2rem; margin-bottom: 1.75rem;
      box-shadow: var(--shadow); overflow: hidden;
      opacity: 0; transform: translateY(16px); animation: rise .5s forwards;
    }
    .card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--grad); }
    .card:nth-child(2) { animation-delay: .08s; }
    @keyframes rise { to { opacity: 1; transform: none; } }
    .card-head { display: flex; align-items: center; gap: .75rem; }
    .card h2 { font-size: 1.5rem; font-weight: 700; color: var(--brand-blue-dark); }
    .pill {
      font-size: .72rem; font-weight: 600; color: var(--brand-blue);
      background: #eef4fc; border: 1px solid #d9e7f8; border-radius: 999px; padding: .15rem .6rem;
    }
    .sub { color: var(--muted); margin: .35rem 0 1.25rem; }
    .group { margin-top: 1.5rem; }
    .group h3 {
      font-size: .78rem; text-transform: uppercase; letter-spacing: .09em;
      color: var(--brand-blue); margin-bottom: .65rem; display: flex; align-items: center; gap: .4rem;
    }
    .count {
      background: #eef2f9; color: var(--muted); border-radius: 999px;
      padding: .05rem .5rem; font-size: .7rem; font-weight: 600;
    }
    ul { list-style: none; display: grid; gap: .7rem;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
    li a {
      display: flex; align-items: center; gap: .75rem;
      padding: .7rem .8rem; border-radius: 14px;
      color: var(--fg); text-decoration: none; background: var(--panel);
      border: 1px solid var(--border); font-size: .9rem; font-weight: 500;
      position: relative; overflow: hidden;
      transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s, border-color .2s;
    }
    li a .ico {
      flex: 0 0 auto; width: 34px; height: 34px; border-radius: 10px;
      display: grid; place-items: center; font-size: .95rem; font-weight: 700;
      color: #fff; background: var(--grad); box-shadow: 0 2px 6px rgba(0,114,206,.35);
      transition: transform .2s;
    }
    li a .txt {
      flex: 1 1 auto; min-width: 0; line-height: 1.3;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    li a .chev {
      flex: 0 0 auto; color: var(--muted); font-size: 1.35rem; font-weight: 700;
      transform: translateX(-4px); opacity: .5; transition: .2s;
    }
    li a:hover {
      border-color: transparent; transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(15, 23, 42, .14);
    }
    li a:hover .ico { transform: scale(1.08) rotate(-4deg); background: linear-gradient(135deg, var(--brand-red), #ff5a75); box-shadow: 0 4px 12px rgba(228,3,46,.4); }
    li a:hover .chev { transform: translateX(0); opacity: 1; color: var(--brand-blue); }
    li a::after {
      content: ""; position: absolute; inset: 0; border-radius: 14px; padding: 1px;
      background: var(--grad); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      opacity: 0; transition: opacity .2s; pointer-events: none;
    }
    li a:hover::after { opacity: 1; }
    li.hidden { display: none; }
    .group.hidden, .card.hidden { display: none; }
    .no-results { text-align: center; color: var(--muted); padding: 3rem 1rem; display: none; }
    .no-results.show { display: block; }

    footer { text-align: center; color: var(--muted); font-size: .85rem; padding: 2rem 1.5rem 3rem; border-top: 1px solid var(--border); }
    footer b { color: var(--brand-blue-dark); }

    @media (max-width: 720px) {
      nav .links { display: none; }
      nav .search input { width: 150px; }
      nav .search input:focus { width: 170px; }
    }
  </style>
</head>
<body>
  <nav>
    <a class="brand" href="#top"><img src="logo.png" alt="LARION"><b>BMAD <span>Hub</span></b></a>
    <div class="links">
      <a href="#bmad">BMAD</a>
      <a href="#cis">Creative Studio</a>
    </div>
    <label class="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/></svg>
      <input id="q" type="search" placeholder="Search docs…" autocomplete="off">
    </label>
  </nav>
  <div class="wrap">
${section('bmad', 'BMAD', '', [
  { name: 'Docs', items: bmm.map(f => ({ href: `BMAD/${f}`, label: title(f).replace('Bmm ', 'BMM ') })) },
  { name: 'Changelogs', items: changelog.map(f => ({ href: `BMAD/${f}`, label: title(f) })) },
  { name: 'Core Skills', items: core.map(f => ({ href: `BMAD/bmadskills/${f}`, label: title(f) })) },
  { name: 'Test Architecture (TEA)', items: tea.map(f => ({ href: `BMAD/bmadskills/${f}`, label: title(f) })) },
  { name: 'Web Design System (WDS)', items: wds.map(f => ({ href: `BMAD/bmadskills/${f}`, label: title(f) })) },
])}
${section('cis', 'Creative Innovation Studio', '', [
  { name: 'Docs', items: cisRoot.map(f => ({ href: `BMAD_CIS/bmad-cis/${f}`, label: title(f) })) },
  { name: 'Agents', items: cisAgents.map(f => ({ href: `BMAD_CIS/bmad-cis/cisagents/${f}`, label: title(f) })) },
  { name: 'Skills', items: cisSkills.map(f => ({ href: `BMAD_CIS/bmad-cis/cisskills/${f}`, label: title(f) })) },
])}
    <p class="no-results">No documents match your search.</p>
  </div>
  <footer><b>BMAD Structure</b> &middot; ${bmadRoot.length + bmadSkills.length + cisRoot.length + cisAgents.length + cisSkills.length} documents &middot; LARION</footer>
  <script>
    const q = document.getElementById('q');
    const items = [...document.querySelectorAll('li a')];
    const groups = [...document.querySelectorAll('.group')];
    const cards = [...document.querySelectorAll('.card')];
    const noResults = document.querySelector('.no-results');
    q.addEventListener('input', () => {
      const term = q.value.trim().toLowerCase();
      items.forEach(a => a.parentElement.classList.toggle('hidden', term && !a.dataset.name.includes(term)));
      groups.forEach(g => g.classList.toggle('hidden', ![...g.querySelectorAll('li')].some(li => !li.classList.contains('hidden'))));
      cards.forEach(c => c.classList.toggle('hidden', ![...c.querySelectorAll('.group')].some(g => !g.classList.contains('hidden'))));
      noResults.classList.toggle('show', term && cards.every(c => c.classList.contains('hidden')));
    });
  </script>
</body>
</html>
`;

writeFileSync(`${root}/index.html`, html);
console.log('Wrote index.html');
console.log('BMM:', bmm.length, 'Changelog:', changelog.length, 'Core:', core.length, 'TEA:', tea.length, 'SPP:', spp.length, 'WDS:', wds.length);
console.log('CIS root:', cisRoot.length, 'agents:', cisAgents.length, 'skills:', cisSkills.length);
