const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('site-header');
const headerNav = header ? header.querySelector('nav') : null;
const sections = document.querySelectorAll('section[id]');
const year = document.getElementById('year');

const setActiveLink = (targetId) => {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');

    if (href === targetId) {
      link.classList.add('text-accent', 'font-semibold');
      link.classList.remove('text-white/60');
    } else {
      link.classList.remove('text-accent', 'font-semibold');
      link.classList.add('text-white/60');
    }
  });
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      event.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(targetId);
      }
    }

    if (menu && !menu.classList.contains('hidden') && window.innerWidth < 1024) {
      menu.classList.add('hidden');
    }
  });
});

const applyHeaderStyles = () => {
  if (!header) return;

  const scrolledClasses = ['bg-black/80', 'border-white/10', 'backdrop-blur'];
  const restClasses = ['border-transparent'];

  if (window.scrollY > 50) {
    header.classList.add(...scrolledClasses, 'shadow-lg');
    header.classList.remove(...restClasses);

    if (headerNav) {
      headerNav.classList.remove('py-6');
      headerNav.classList.add('py-4');
    }
  } else {
    header.classList.remove(...scrolledClasses, 'shadow-lg');
    header.classList.add(...restClasses);

    if (headerNav) {
      headerNav.classList.add('py-6');
      headerNav.classList.remove('py-4');
    }
  }
};

applyHeaderStyles();
window.addEventListener('scroll', applyHeaderStyles);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(`#${entry.target.id}`);
      }
    });
  },
  {
    root: null,
    threshold: 0.45,
    rootMargin: '-10% 0px -40% 0px',
  }
);

sections.forEach((section) => observer.observe(section));
setActiveLink('#home');
