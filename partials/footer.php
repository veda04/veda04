</main>

</div>

<script>
    // Hide page loader once all resources (including images) are fully loaded
    (function () {
        function dismissLoader() {
            var loader = document.getElementById('page-loader');
            if (!loader) return;
            loader.classList.add('loader-hidden');
            setTimeout(function () { loader.style.display = 'none'; }, 420);
        }
        if (document.readyState === 'complete') {
            dismissLoader();
        } else {
            window.addEventListener('load', dismissLoader);
            // Fallback: dismiss after 8s even if some resources stall
            setTimeout(dismissLoader, 8000);
        }
    })();
</script>
<script>window.APP_URL = '<?= rtrim(APP_URL, '/') ?>';</script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" defer></script>
<script src="<?= url('assets/js/app.js'); ?>" defer></script>
<script defer>
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 50
            });
        }
    });
</script>
<script>
    // Theme toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        
        // Function to update icon visibility
        function updateThemeIcon() {
            if (htmlElement.classList.contains('dark')) {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            } else {
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            }
        }
        
        // Function to set theme
        function setTheme(theme) {
            if (theme === 'dark') {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else if (theme === 'light') {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else if (theme === 'system') {
                localStorage.setItem('theme', 'system');
                // Apply system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    htmlElement.classList.add('dark');
                } else {
                    htmlElement.classList.remove('dark');
                }
            }
            updateThemeIcon();
        }
        
        // Initialize icon on page load
        updateThemeIcon();
        
        // Toggle theme on button click
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', function() {
                const currentTheme = localStorage.getItem('theme');
                
                // Cycle through: light -> dark -> light
                // If you want to include system preference, modify this logic:
                // light -> dark -> system -> light
                if (htmlElement.classList.contains('dark')) {
                    setTheme('light');
                } else {
                    setTheme('dark');
                }
            });
        }
        
        // Listen for system theme changes (if theme is set to 'system')
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('theme') === 'system') {
                if (e.matches) {
                    htmlElement.classList.add('dark');
                } else {
                    htmlElement.classList.remove('dark');
                }
                updateThemeIcon();
            }
        });
    });
</script>
</body>
</html>