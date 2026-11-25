const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('dar-altqwa-theme');

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeToggle) themeToggle.setAttribute('aria-label', theme === 'dark' ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن');
}

applyTheme(savedTheme || 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('dar-altqwa-theme', nextTheme);
});

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  mainNav?.classList.toggle('open', !isOpen);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
  });
});

const bookingForm = document.querySelector('#booking-form');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const message = [
    'السلام عليكم، أرغب في الاستفسار عن حجز في فندق دار التقوى.',
    `الاسم: ${data.get('name')}`,
    `الجوال: ${data.get('phone')}`,
    `تاريخ الوصول: ${data.get('arrival')}`,
    `عدد الليالي: ${data.get('nights')}`,
    `نوع الغرفة: ${data.get('room')}`,
    `ملاحظات: ${data.get('notes') || 'لا توجد'}`
  ].join('\n');
  window.open(`https://wa.me/966148291111?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
