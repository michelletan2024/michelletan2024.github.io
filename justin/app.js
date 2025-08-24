// Theme toggle with localStorage persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.classList.add('light');
  themeToggle.textContent = '🌞';
  themeToggle.setAttribute('aria-pressed', 'true');
}
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  const isLight = root.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '🌞' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(isLight));
});

// Like button (demo persistence)
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const likes = Number(localStorage.getItem('likes') || 0);
likeCount.textContent = likes;
likeBtn.addEventListener('click', ()=>{
  const newLikes = Number(localStorage.getItem('likes') || 0) + 1;
  localStorage.setItem('likes', newLikes);
  likeCount.textContent = newLikes;
  likeBtn.classList.add('pulse');
  setTimeout(()=>likeBtn.classList.remove('pulse'), 400);
});

// Discography data (fan-curated demo)
const albums = [
  {
    title: 'My World 2.0', year: 2010,
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'Baby', preview: 'https://www.youtube.com/embed/kffacxfA7G4'
  },
  {
    title: 'Believe', year: 2012,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'Boyfriend', preview: 'https://www.youtube.com/embed/4GuqB1BQVr4'
  },
  {
    title: 'Purpose', year: 2015,
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'Sorry', preview: 'https://www.youtube.com/embed/fRh_vgS2dFE'
  },
  {
    title: 'Changes', year: 2020,
    cover: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'Intentions', preview: 'https://www.youtube.com/embed/6Yn4ZsQZ_18'
  },
  {
    title: 'Justice', year: 2021,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'Peaches', preview: 'https://www.youtube.com/embed/tQ0yjYUFKAE'
  },
  {
    title: 'Journals (Collection)', year: 2013,
    cover: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop',
    topTrack: 'All That Matters', preview: 'https://www.youtube.com/embed/o9gLqh8tmPA'
  }
];

const albumGrid = document.getElementById('albumGrid');
albums.sort((a,b)=> a.year - b.year).forEach((a)=>{
  const card = document.createElement('article');
  card.className = 'album';
  card.setAttribute('tabindex','0');
  card.setAttribute('role','listitem');
  card.innerHTML = `
    <img src="${a.cover}" alt="Cover art style image for ${a.title}" loading="lazy"/>
    <div class="meta">
      <span class="badge">${a.year}</span>
      <h3 style="margin:.2rem 0">${a.title}</h3>
      <p class="muted">Top track: <strong>${a.topTrack}</strong></p>
      <button class="btn" aria-label="Preview ${a.topTrack} from ${a.title}">▶ Preview</button>
    </div>
  `;
  const btn = card.querySelector('button');
  btn.addEventListener('click', ()=> openPreview(a));
  card.addEventListener('keypress', (e)=>{ if(e.key==='Enter') openPreview(a); });
  albumGrid.appendChild(card);
});

function openPreview(a){
  const w = window.open('', '_blank', 'noopener');
  if(!w){ alert('Popup blocked. Please allow popups to preview.'); return; }
  w.document.write(`<!DOCTYPE html><title>${a.title} • Preview</title><style>body{margin:0;background:#000;display:grid;place-items:center;height:100vh}iframe{width:90vw;height:50.6vw;max-width:1000px;max-height:562px;border:0;border-radius:12px}</style><iframe allowfullscreen src="${a.preview}"></iframe>`);
}

// Timeline data (fan demo)
const timeline = [
  { year: '2008', text: 'Discovered on YouTube; signs with RBMG.' },
  { year: '2010', text: 'Debut studio album My World 2.0 released; international breakthrough.' },
  { year: '2015', text: 'Purpose era delivers a string of global hits.' },
  { year: '2020', text: 'Releases Changes, exploring a more R&B direction.' },
  { year: '2021', text: 'Justice drops with chart-topping singles including "Peaches".' }
];

const timelineList = document.getElementById('timelineList');
timeline.forEach(ev => {
  const item = document.createElement('div');
  item.className = 'event';
  item.setAttribute('role','listitem');
  item.innerHTML = `<h4>${ev.year}</h4><p>${ev.text}</p>`;
  timelineList.appendChild(item);
});

// Gallery images (royalty-free Unsplash placeholders)
const photos = [
  'justin1.png',
  'justin2.png',
  'justin3.png',
  'justin4.png',
];

const galleryGrid = document.getElementById('galleryGrid');
photos.forEach(src => {
  const img = document.createElement('img');
  img.src = src; img.loading = 'lazy'; img.alt = 'Concert / music themed photo';
  img.addEventListener('click', ()=> openLightbox(src));
  galleryGrid.appendChild(img);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
function openLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.add('open');
}
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) lightbox.classList.remove('open');
});
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') lightbox.classList.remove('open');
});

// Quiz logic
const answers = { q1: '1994', q2: 'purpose', q3: 'sorry' };
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
quizForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(quizForm);
  let score = 0;
  if ((data.get('q1')||'').trim() === answers.q1) score++;
  if ((data.get('q2')||'').trim().toLowerCase() === answers.q2) score++;
  if ((data.get('q3')||'').trim().toLowerCase() === answers.q3) score++;
  quizResult.textContent = `You scored ${score}/3 ${score===3 ? '✨ Belieber legend!' : score===2 ? '🔥 Almost there!' : '💫 Keep exploring!'}`;
  quizForm.reset();
});

// Newsletter demo (client-side only)
const newsForm = document.getElementById('newsForm');
const newsMsg = document.getElementById('newsMsg');
newsForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = new FormData(newsForm).get('email').trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!valid){ newsMsg.textContent = 'Please enter a valid email.'; return; }
  localStorage.setItem('newsletterEmail', email);
  newsMsg.textContent = 'Subscribed! (Demo only)';
  newsForm.reset();
});

// Smooth scroll for Back to top
document.getElementById('toTop').addEventListener('click', (e)=>{
  e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'});
});
