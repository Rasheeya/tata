/* =============================================
   Antigravity Real Estate – script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky Header ---- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ---- Mobile Menu Toggle ---- */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks  = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    // close nav when link clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });
  }

  /* ---- Hero Search Tabs ---- */
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ---- Filter Buttons (Featured Properties) ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.property-card[data-status]').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInCard 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---- Wishlist (Heart) Toggle ---- */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const icon = btn.querySelector('i');
      const wasLiked = icon.classList.contains('fas');
      icon.classList.toggle('fas', !wasLiked);
      icon.classList.toggle('far', wasLiked);
      icon.style.color = wasLiked ? '' : '#ef4444';
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = '', 250);
    });
  });

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });



  /* ---- Intersection Observer: fade-in items on scroll ---- */
  const observerOpts = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.property-card, .blog-card, .testimonial-card, .category-card, .stat-card, .section-title, .about-grid > div, .contact-info-list .contact-item').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`; // staggered entrance
    observer.observe(el);
  });

  /* ---- Counter animation for stat numbers ---- */
  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const easeOutQuad = t => t * (2 - t);
    
    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = easeOutQuad(Math.min(elapsed / duration, 1));
      
      const currentCount = Math.floor(progress * target);
      el.textContent = currentCount.toLocaleString() + (el.dataset.suffix || '');
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target));
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ---- Active nav link (from current URL) ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', linkPage === currentPage);
  });

  /* ---- Dashboard Sidebar Toggle ---- */
  const sidebarBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('dashboardSidebar');
  const overlay = document.getElementById('mobileOverlay');

  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      });
    }

    // Close when clicking nav links
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
      });
    });
  }

});

/* Global CSS additions for animations */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInCard {
    from { opacity:0; transform:translateY(15px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .wishlist-btn {
    position:absolute; top:1rem; right:1rem;
    width:36px; height:36px; border-radius:50%;
    background:rgba(255,255,255,0.95);
    display:flex; align-items:center; justify-content:center;
    color:#111; font-size:0.875rem;
    box-shadow:0 2px 8px rgba(0,0,0,0.15);
    transition:all 0.25s ease;
    cursor:pointer;
    border:none;
  }
  .wishlist-btn:hover { background:white; box-shadow:0 4px 16px rgba(0,0,0,0.2); }
`;
document.head.appendChild(style);

