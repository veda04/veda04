document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    let isMenuOpen = false;

    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Open menu
            mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
            mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            // Close menu
            mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
            mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // Close menu when clicking outside
    function closeMobileMenu() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }

    // Event listeners
    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize to larger screen
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) { // md breakpoint
            closeMobileMenu();
        }
    });

    // Handle smooth scrolling for anchor links (if any)
    mobileMenuLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                closeMobileMenu();
            });
        }
    });
});

// Infinite scroll for article listing pages (projects & blogs)
(function () {
    var grid     = document.getElementById('article-grid');
    var sentinel = document.getElementById('scroll-sentinel');
    var loader   = document.getElementById('scroll-loader');

    if (!grid || !sentinel || !loader) return;

    var category  = grid.dataset.category  || '';
    var urlPrefix = grid.dataset.urlPrefix  || '';
    var tag       = grid.dataset.tag        || '';
    var page      = parseInt(grid.dataset.page,  10) || 1;
    var limit     = parseInt(grid.dataset.limit, 10) || 8;
    var loading   = false;

    function cutWords(str, max) {
        if (!str) return '';
        if (str.length <= max) return str;
        return str.substring(0, max).trimEnd() + '\u2026';
    }

    function buildCard(article) {
        var wrapper = document.createElement('div');
        wrapper.className = 'w-full';
        wrapper.setAttribute('data-aos', 'fade-up');
        wrapper.setAttribute('data-aos-delay', '100');

        var inner = document.createElement('div');
        inner.className = 'card-bg-radial rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col';

        var imgWrap = document.createElement('div');
        imgWrap.className = 'aspect-[40/21] overflow-hidden rounded-t-lg';

        var img = document.createElement('img');
        img.src     = article.featuredImage    || '';
        img.alt     = article.featuredImageAlt || article.title;
        img.loading = 'lazy';
        img.className = 'w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300';
        imgWrap.appendChild(img);

        var body = document.createElement('div');
        body.className = 'p-4 sm:p-6 flex flex-col flex-grow';

        var h3 = document.createElement('h3');
        h3.className   = 'text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white';
        h3.textContent = cutWords(article.title, 60);

        var p = document.createElement('p');
        p.className   = 'text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 flex-grow';
        p.textContent = cutWords(article.excerpt, 120);

        var a = document.createElement('a');
        a.className   = 'text-right text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium';
        a.href        = urlPrefix + '/' + article.slug;
        a.textContent = 'Read more \u2192';

        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(a);
        inner.appendChild(imgWrap);
        inner.appendChild(body);
        wrapper.appendChild(inner);

        return wrapper;
    }

    function loadMore() {
        if (loading) return;
        loading = true;
        loader.classList.remove('hidden');

        var nextPage = page + 1;
        var params   = 'category=' + encodeURIComponent(category) +
                       '&page='    + nextPage +
                       '&limit='   + limit;
        if (tag) params += '&tag=' + encodeURIComponent(tag);

        fetch((window.APP_URL || '') + '/api/articles?' + params)
            .then(function (res) {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then(function (data) {
                if (!data.success) throw new Error('API error');

                data.articles.forEach(function (article) {
                    grid.appendChild(buildCard(article));
                });

                page = nextPage;
                grid.dataset.page = page;

                if (typeof AOS !== 'undefined') AOS.refresh();

                if (!data.hasMore) {
                    observer.disconnect();
                    sentinel.remove();
                }
            })
            .catch(function () {
                observer.disconnect();
                sentinel.remove();
            })
            .finally(function () {
                loading = false;
                loader.classList.add('hidden');
            });
    }

    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            loadMore();
        }
    }, { rootMargin: '200px' });

    observer.observe(sentinel);
}());