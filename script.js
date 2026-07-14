const fallbackItems = [
  { title: '成績查詢', description: '快速查閱會考成績與相關資訊。', icon: 'fa-solid fa-magnifying-glass', badge: '熱門', link: '#' },
  { title: '落點分析', description: '依據成績與志願，找到適合你的下一步。', icon: 'fa-solid fa-bullseye', badge: '推薦', link: '#' },
  { title: '志願選填', description: '掌握校系資訊，規劃理想志願排序。', icon: 'fa-solid fa-pen-ruler', badge: '', link: '#' },
  { title: '歷年資料', description: '彙整歷屆資料，讓準備更有依據。', icon: 'fa-solid fa-book-open', badge: '', link: '#' },
  { title: '升學資訊', description: '重要日程、招生消息與常見問題。', icon: 'fa-solid fa-graduation-cap', badge: '最新', link: '#' },
  { title: '問題回報', description: '遇到問題嗎？我們會協助你處理。', icon: 'fa-regular fa-message', badge: '', link: '#' }
];

let items = fallbackItems;

function updateCountdown() {
  const target = new Date('2027-05-15T00:00:00+08:00');
  const diff = Math.max(0, target - new Date());
  const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
  Object.entries(units).forEach(([id, unit]) => {
    const value = id === 'days' ? Math.floor(diff / unit) : Math.floor(diff / unit) % (id === 'hours' ? 24 : 60);
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  });
}

function renderItems(list) {
  const container = document.getElementById('navList');
  if (!container) return;
  container.innerHTML = list.map(item => `
    <article class="nav-item"><a class="nav-link" href="${item.link || '#'}">
      <i class="icon ${item.icon || 'fa-solid fa-arrow-up-right-from-square'}" aria-hidden="true"></i>
      ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
      <h3 class="nav-title">${item.title}</h3><p class="nav-description">${item.description || ''}</p>
    </a></article>`).join('');
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    clear.hidden = !query;
    renderItems(items.filter(item => `${item.title} ${item.description}`.toLocaleLowerCase().includes(query)));
  });
  clear.addEventListener('click', () => { input.value = ''; clear.hidden = true; renderItems(items); input.focus(); });
}

async function loadItems() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwRsZhyEsERd2QAPJDVNOEKcIFf96C2EoL2N4n8nMErJpq-8FY9Th6JgrDoW_bU8Dewew/exec');
    const data = await response.json();
    if (Array.isArray(data) && data.length) items = data;
  } catch (_) { /* Keep the useful built-in services when the remote source is unavailable. */ }
  renderItems(items);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCountdown(); setInterval(updateCountdown, 1000);
  loadItems(); setupSearch();
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => { backToTop.style.display = window.scrollY > 500 ? 'block' : 'none'; });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
