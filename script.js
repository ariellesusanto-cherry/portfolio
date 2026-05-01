(function () {
    'use strict';

    /* Reveal-on-scroll
       ───────────────────────────────────────────
       Adds .in to any .reveal element when it enters the viewport.
       Honors prefers-reduced-motion. */
    const reveals = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
        );
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }

    /* Nav hairline on scroll
       ─────────────────────────────────────────── */
    const nav = document.getElementById('top-nav');
    if (nav) {
        let scrolled = false;
        const onScroll = () => {
            const should = window.scrollY > 8;
            if (should !== scrolled) {
                scrolled = should;
                nav.classList.toggle('scrolled', scrolled);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
