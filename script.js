let currentLanguage = 'zh'; // Default language is Chinese
let currentMode = 'dark';     // Default mode is dark

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
  updateContent();
  document.getElementById('languageToggle').textContent = currentLanguage === 'zh' ? 'EN' : '中';
}

function switchMode() {
  currentMode = currentMode === 'dark' ? 'light' : 'dark';
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
  document.querySelector('.hero h1').innerHTML = `<i class="fas fa-graduation-cap"></i> ${translations[currentLanguage].title}`;
  document.querySelector('#countdown').textContent = `${translations[currentLanguage].countdown} ${document.querySelector('#countdown').textContent.split(':')[1] || ''}`;
  
  // Update coming soon section
  document.querySelector('.coming-soon h2').innerHTML = `<i class="fas fa-rocket"></i> ${translations[currentLanguage].comingSoonTitle}`;
  document.querySelector('.coming-soon p').textContent = translations[currentLanguage].comingSoonDesc;
  
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
  
  updateCountdown(); // Refresh countdown with language-specific labels
}

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

function initializeNavEffects() {
  // Additional navigation effects can be added here if needed.
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