// Use persisted settings if available
let currentLanguage = localStorage.getItem('currentLanguage') || 'zh';
let currentMode = localStorage.getItem('currentMode') || 'dark';

const translations = {
  zh: {
    countdown: '114會考倒數:',
    title: 'TYCTW會考資訊整合平台',
    comingSoonTitle: '更多功能即將推出！',
    comingSoonDesc: '我們正在不斷努力，為您開發更多有用的工具和資源。敬請期待！',
    footer1: '會考資訊整合平台. All rights reserved.',
    footer2: '由 TYCTW會考落點分析平台 設計與維護',
    loading: '載入中...'
  },
  en: {
    countdown: 'Countdown to 114 Exam:',
    title: 'TYCTW Exam Information Integration Platform',
    comingSoonTitle: 'More features coming soon!',
    comingSoonDesc: 'We are constantly working to develop more useful tools and resources for you. Stay tuned!',
    footer1: 'Exam Information Integration Platform. All rights reserved.',
    footer2: 'Designed and maintained by TYCTW Exam Score Analysis Platform',
    loading: 'Loading...'
  }
};

function switchLanguage() {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  localStorage.setItem('currentLanguage', currentLanguage);
  updateContent();
  document.getElementById('languageToggle').textContent = currentLanguage === 'zh' ? 'EN' : '中';
}

function switchMode() {
  currentMode = currentMode === 'dark' ? 'light' : 'dark';
  localStorage.setItem('currentMode', currentMode);
  document.documentElement.setAttribute('data-theme', currentMode);
  document.body.setAttribute('data-theme', currentMode);
  updateModeIcon();
}

function updateModeIcon() {
  const modeIcon = document.querySelector('#modeToggle i');
  modeIcon.className = currentMode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function updateContent() {
  // Update header title and countdown
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.innerHTML = `<i class="fas fa-graduation-cap"></i> ${translations[currentLanguage].title}`;
  }
  
  // Update countdown text using updateCountdown function (will reset its content)
  updateCountdown();

  // Update coming soon section
  const comingSoonHeading = document.querySelector('.coming-soon h2');
  if (comingSoonHeading) {
    comingSoonHeading.innerHTML = `<i class="fas fa-rocket"></i> ${translations[currentLanguage].comingSoonTitle}`;
  }
  const comingSoonDesc = document.querySelector('.coming-soon p');
  if (comingSoonDesc) {
    comingSoonDesc.textContent = translations[currentLanguage].comingSoonDesc;
  }
  
  // Update footer text
  const footerParas = document.querySelectorAll('.footer p');
  if (footerParas.length >= 2) {
    footerParas[0].textContent = ` 2025 ${translations[currentLanguage].footer1}`;
    footerParas[1].textContent = translations[currentLanguage].footer2;
  }
  
  // Update loading text if visible
  const loadingText = document.querySelector('.loading-text');
  if (loadingText) {
    loadingText.textContent = translations[currentLanguage].loading;
  }
}

// New: Add staggered fade-in animation to navigation items for a smoother appearance.
function initializeNavEffects() {
  const navItems = document.querySelectorAll('#navList .nav-item');
  navItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.animation = 'fadeInUp 0.8s ease forwards';
    item.style.animationDelay = `${index * 0.1}s`;
  });
}

// New: Filter navigation items based on the search input.
function filterNavItems() {
  const filter = document.getElementById('searchInput').value.toLowerCase();
  const navItems = document.querySelectorAll('#navList .nav-item');
  navItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? "block" : "none";
  });
}

// New: Setup Back to Top button functionality.
function setupBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.animation = 'fadeOut 0.5s ease-out forwards';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
}

function updateCountdown() {
  const examDate = new Date("2025-05-17T00:00:00+08:00");
  const now = new Date();
  const difference = examDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
    const dayLabel = currentLanguage === 'zh' ? '天' : 'd';
    const hourLabel = currentLanguage === 'zh' ? '小時' : 'h';
    const minuteLabel = currentLanguage === 'zh' ? '分' : 'm';
    const secondLabel = currentLanguage === 'zh' ? '秒' : 's';
    countdownElement.textContent = `${translations[currentLanguage].countdown} ${days}${dayLabel} ${hours}${hourLabel} ${minutes}${minuteLabel} ${seconds}${secondLabel}`;
  }
}

// Fetch navigation items from external source
function fetchNavItems() {
  fetch('https://script.google.com/macros/s/AKfycbwRsZhyEsERd2QAPJDVNOEKcIFf96C2EoL2N4n8nMErJpq-8FY9Th6JgrDoW_bU8Dewew/exec')
    .then(response => response.json())
    .then(data => {
      const navList = document.getElementById('navList');
      data.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
          <a href="${item.link}" class="nav-link">
            <i class="${item.icon} icon"></i>
            <span class="nav-title">${item.title}</span>
            <p class="nav-description">${item.description}</p>
            ${item.badge ? `<span class="badge ${item.badge}-badge">${item.badge}</span>` : ''}
          </a>
        `;
        navList.appendChild(li);
      });
      initializeNavEffects();
      updateContent();
      document.documentElement.setAttribute('data-theme', currentMode);
      document.body.setAttribute('data-theme', currentMode);
      updateModeIcon();
      hideLoadingOverlay();
    })
    .catch(error => {
      console.error('Error fetching nav items:', error);
      hideLoadingOverlay();
    });
}

// Main event listener
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', currentMode);
  document.body.setAttribute('data-theme', currentMode);
  updateModeIcon();
  fetchNavItems();
  document.getElementById('languageToggle').addEventListener('click', switchLanguage);
  document.getElementById('modeToggle').addEventListener('click', switchMode);
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Attach event listener for the new search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterNavItems);
  }
  
  // Initialize Back to Top button
  setupBackToTop();
});

// Disable copy, PrintScreen, context menu and text selection
document.addEventListener('copy', e => { e.preventDefault(); return false; });
document.addEventListener('keyup', e => {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    alert('截圖功能已被禁用');
  }
});
document.addEventListener('contextmenu', e => { e.preventDefault(); });
document.onselectstart = () => false;