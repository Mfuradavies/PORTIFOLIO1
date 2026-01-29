// Small interaction: mobile nav toggle
        (function () {
            const toggle = document.getElementById('mobile-toggle');
            const nav = document.querySelector('nav.primary');
            function setDisplay() { if (window.innerWidth <= 960) { toggle.style.display = 'block'; nav.style.display = 'none' } else { toggle.style.display = 'none'; nav.style.display = 'flex' } }
            setDisplay(); window.addEventListener('resize', setDisplay);
            toggle.addEventListener('click', () => { if (nav.style.display === 'none' || nav.style.display === '') { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; nav.style.background = 'rgba(0,0,0,0.6)'; nav.style.position = 'absolute'; nav.style.right = '24px'; nav.style.top = '64px'; nav.style.padding = '12px'; } else { nav.style.display = 'none' } });
        })();

        // Smooth scrolling for in-page anchors (accounts for fixed header)
        (function () {
            const headerOffset = 72; // matches CSS scroll-padding-top
            const nav = document.querySelector('nav.primary');

            function scrollToHash(hash) {
                if (!hash || hash === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const target = document.querySelector(hash);
                if (!target) return;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    // Allow external or mailto links to behave normally
                    if (!href || !href.startsWith('#')) return;
                    const target = document.querySelector(href);
                    if (!target && href !== '#') return;
                    e.preventDefault();
                    scrollToHash(href);
                    // Update URL without jumping
                    if (history.pushState) history.pushState(null, '', href);
                    else location.hash = href;

                    // If mobile menu is open, close it after selecting a link
                    if (window.innerWidth <= 960 && nav && nav.style.display === 'flex' && nav.style.flexDirection === 'column') {
                        nav.style.display = 'none';
                    }
                });
            });

            // If page is loaded with a hash, scroll to it smoothly
            window.addEventListener('load', () => {
                if (location.hash) {
                    // small timeout to allow layout to settle
                    setTimeout(() => scrollToHash(location.hash), 50);
                }
            });
        })();