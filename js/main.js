/* =========================================================
   KRC — main.js
   Language toggle, nav, scroll effects, animations
   ========================================================= */

const LANG_KEY = 'krc.lang';

const Lang = {
    current: 'en',

    init() {
        const url = new URLSearchParams(location.search).get('lang');
        const saved = localStorage.getItem(LANG_KEY);
        this.current = (url === 'te' || url === 'en') ? url
                     : (saved === 'te' || saved === 'en') ? saved
                     : 'en';
        localStorage.setItem(LANG_KEY, this.current);
        document.documentElement.lang = this.current;
        this.render();

        document.querySelectorAll('.lang-toggle button').forEach(btn => {
            btn.addEventListener('click', () => this.switch(btn.dataset.lang));
        });
    },

    switch(lang) {
        if (lang !== 'en' && lang !== 'te') return;
        this.current = lang;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang;
        const u = new URL(location.href);
        u.searchParams.set('lang', lang);
        history.replaceState({}, '', u);
        this.render();
    },

    render() {
        document.querySelectorAll('[data-lang]').forEach(el => {
            const t = el.dataset.lang;
            // skip toggle buttons (they have data-lang for switching)
            if (el.closest('.lang-toggle')) return;
            el.hidden = (t !== this.current);
        });
        document.querySelectorAll('.lang-toggle button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.current);
        });
    }
};

const Nav = {
    init() {
        const toggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.nav__menu');
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                const open = menu.classList.toggle('is-open');
                toggle.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
            // close on link click (mobile)
            menu.querySelectorAll('a').forEach(a =>
                a.addEventListener('click', () => {
                    menu.classList.remove('is-open');
                    toggle.classList.remove('is-open');
                })
            );
        }

        const nav = document.querySelector('.nav');
        if (nav) {
            const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // active link
        const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.nav__menu a').forEach(a => {
            const href = (a.getAttribute('href') || '').toLowerCase();
            if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
        });
    }
};

const Scroller = {
    init() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in-view');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const id = a.getAttribute('href');
                if (id.length > 1) {
                    const t = document.querySelector(id);
                    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
                }
            });
        });
    }
};

const Forms = {
    init() {
        document.querySelectorAll('form[data-validate]').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validate(form)) e.preventDefault();
            });
        });
    },
    validate(form) {
        let ok = true;
        form.querySelectorAll('[required]').forEach(input => {
            const v = (input.value || '').trim();
            this.clear(input);
            if (!v) { this.err(input, 'Required'); ok = false; return; }
            if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                this.err(input, 'Enter a valid email'); ok = false;
            }
            if (input.type === 'tel' && !/^[0-9+\s()-]{7,}$/.test(v)) {
                this.err(input, 'Enter a valid phone'); ok = false;
            }
        });
        return ok;
    },
    err(input, msg) {
        input.classList.add('error');
        let m = input.parentElement.querySelector('.error-message');
        if (!m) {
            m = document.createElement('span');
            m.className = 'error-message';
            input.parentElement.appendChild(m);
        }
        m.textContent = msg;
    },
    clear(input) {
        input.classList.remove('error');
        const m = input.parentElement.querySelector('.error-message');
        if (m) m.remove();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Lang.init();
    Nav.init();
    Scroller.init();
    Forms.init();
});
