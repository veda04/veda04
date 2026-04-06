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

// Helper function for truncating text
function cutWords(str, max) {
    if (!str) return '';
    if (str.length <= max) return str;
    return str.substring(0, max).trimEnd() + '\u2026';
}

// Infinite scroll for blogs page
(function () {
    var grid     = document.getElementById('article-grid');
    var sentinel = document.getElementById('scroll-sentinel');
    var loader   = document.getElementById('scroll-loader');

    if (!grid || !sentinel || !loader) return;
    
    // Only run on blogs page
    var category = grid.dataset.category || '';
    if (category !== 'blog') return;

    var urlPrefix = grid.dataset.urlPrefix  || '';
    var tag       = grid.dataset.tag        || '';
    var page      = parseInt(grid.dataset.page,  10) || 1;
    var limit     = parseInt(grid.dataset.limit, 10) || 8;
    var loading   = false;

    function buildBlogCard(article) {
        var wrapper = document.createElement('div');
        wrapper.className = 'w-full';
        wrapper.setAttribute('data-aos', 'fade-up');
        wrapper.setAttribute('data-aos-delay', '100');

        var link = document.createElement('a');
        link.href = urlPrefix + '/' + article.slug;
        link.className = 'block h-full group';

        var cardContainer = document.createElement('div');
        cardContainer.className = 'relative rounded-2xl overflow-hidden h-[400px] border border-white/10 backdrop-blur-sm hover:border-olive/30 dark:hover:border-neon/30 transition-all duration-300 hover:shadow-lg hover:shadow-olive/20 dark:hover:shadow-neon/20';

        // Background Image
        var img = document.createElement('img');
        img.src = article.featuredImage || '';
        img.alt = article.featuredImageAlt || article.title;
        img.loading = 'lazy';
        img.className = 'absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500';

        // Dark Gradient Overlay
        var overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80';

        // Content Container
        var content = document.createElement('div');
        content.className = 'relative h-full flex flex-col justify-between p-6';

        var textContent = document.createElement('div');

        var h3 = document.createElement('h3');
        h3.className = 'text-olive dark:text-neon text-lg sm:text-xl font-bold mb-3 group-hover:text-olive-dark dark:group-hover:text-neon-light transition-colors duration-300';
        h3.textContent = article.title;

        var p = document.createElement('p');
        p.className = 'text-white/80 text-sm sm:text-base leading-tight';
        p.textContent = cutWords(article.excerpt, 100);

        textContent.appendChild(h3);
        textContent.appendChild(p);

        // Read More Button
        var readMore = document.createElement('div');
        readMore.className = 'flex items-center gap-2 text-olive dark:text-neon text-sm font-medium group-hover:gap-3 transition-all duration-300';

        var readMoreSpan = document.createElement('span');
        readMoreSpan.textContent = 'Read More';

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-4 h-4 transform group-hover:translate-x-1 transition-transform');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('d', 'M17 8l4 4m0 0l-4 4m4-4H3');

        svg.appendChild(path);
        readMore.appendChild(readMoreSpan);
        readMore.appendChild(svg);

        content.appendChild(textContent);
        content.appendChild(readMore);

        cardContainer.appendChild(img);
        cardContainer.appendChild(overlay);
        cardContainer.appendChild(content);
        link.appendChild(cardContainer);
        wrapper.appendChild(link);

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
                    grid.appendChild(buildBlogCard(article));
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

// Infinite scroll for projects page
(function () {
    var grid     = document.getElementById('article-grid');
    var sentinel = document.getElementById('scroll-sentinel');
    var loader   = document.getElementById('scroll-loader');

    if (!grid || !sentinel || !loader) return;
    
    // Only run on projects page
    var category = grid.dataset.category || '';
    if (category !== 'project') return;

    var urlPrefix = grid.dataset.urlPrefix  || '';
    var tag       = grid.dataset.tag        || '';
    var page      = parseInt(grid.dataset.page,  10) || 1;
    var limit     = parseInt(grid.dataset.limit, 10) || 8;
    var loading   = false;

    function buildProjectCard(article) {
        var wrapper = document.createElement('div');
        wrapper.className = 'w-full';
        wrapper.setAttribute('data-aos', 'fade-up');
        wrapper.setAttribute('data-aos-delay', '100');

        // Device Frame
        var deviceFrame = document.createElement('div');
        deviceFrame.className = 'bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 dark:border-gray-600 hover:shadow-neon/20 transition-all duration-300 min-h-[400px] flex flex-col';

        // Browser Tab Bar
        var tabBar = document.createElement('div');
        tabBar.className = 'bg-gray-700 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-600 dark:border-gray-700';

        var dots = document.createElement('div');
        dots.className = 'flex gap-1.5';

        var redDot = document.createElement('div');
        redDot.className = 'w-3 h-3 rounded-full bg-red-500';

        var yellowDot = document.createElement('div');
        yellowDot.className = 'w-3 h-3 rounded-full bg-yellow-500';

        var greenDot = document.createElement('div');
        greenDot.className = 'w-3 h-3 rounded-full bg-green-500';

        dots.appendChild(redDot);
        dots.appendChild(yellowDot);
        dots.appendChild(greenDot);

        var tabContent = document.createElement('div');
        tabContent.className = 'flex-1 flex items-center gap-2 ml-2';

        var tab = document.createElement('div');
        tab.className = 'bg-gray-600 dark:bg-gray-700 rounded-t-lg px-3 py-1 text-xs text-gray-300 max-w-[120px] truncate';
        tab.textContent = cutWords(article.title, 20);

        tabContent.appendChild(tab);
        tabBar.appendChild(dots);
        tabBar.appendChild(tabContent);

        // Screen Content - Horizontal Layout
        var screenContent = document.createElement('div');
        screenContent.className = 'bg-white dark:bg-gray-900 flex flex-col sm:flex-row h-full flex-1';

        // Image Side
        var imageSide = document.createElement('div');
        imageSide.className = 'sm:w-4/5 overflow-hidden';

        var img = document.createElement('img');
        img.src = article.featuredImage || '';
        img.alt = article.featuredImageAlt || article.title;
        img.loading = 'lazy';
        img.className = 'w-full h-full object-cover hover:scale-105 transition-transform duration-500';

        imageSide.appendChild(img);

        // Content Side
        var contentSide = document.createElement('div');
        contentSide.className = 'sm:w-3/5 p-4 sm:p-6 flex flex-col justify-between';

        var textWrapper = document.createElement('div');

        var h3 = document.createElement('h3');
        h3.className = 'text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white';
        h3.textContent = cutWords(article.title, 60);

        var p = document.createElement('p');
        p.className = 'text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4';
        p.textContent = cutWords(article.excerpt, 120);

        textWrapper.appendChild(h3);
        textWrapper.appendChild(p);

        // Read More Link
        var link = document.createElement('a');
        link.className = 'inline-flex items-center gap-2 text-sm sm:text-base text-neon dark:text-neon hover:text-neon dark:hover:text-neon transition-colors duration-300 font-medium group';
        link.href = urlPrefix + '/' + article.slug;

        var linkSpan = document.createElement('span');
        linkSpan.textContent = 'Read more';

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-4 h-4 transform group-hover:translate-x-1 transition-transform');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('d', 'M17 8l4 4m0 0l-4 4m4-4H3');

        svg.appendChild(path);
        link.appendChild(linkSpan);
        link.appendChild(svg);

        contentSide.appendChild(textWrapper);
        contentSide.appendChild(link);

        screenContent.appendChild(imageSide);
        screenContent.appendChild(contentSide);

        deviceFrame.appendChild(tabBar);
        deviceFrame.appendChild(screenContent);
        wrapper.appendChild(deviceFrame);

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
                    grid.appendChild(buildProjectCard(article));
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

{/* Intersection Observer for fade-in animations */}
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Smooth scroll for any future anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only handle if it's still a hash link (not a full URL)
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                console.error('Invalid selector:', href);
            }
        }
    });
});