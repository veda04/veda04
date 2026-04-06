<header class="py-4 sm:py-6 lg:py-6 px-4 sm:px-6 lg:px-10 text-center fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
    <nav class="relative">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2 lg:gap-4">
                <a href="<?= url('/') ?>">
                    <!-- <img src="<?= url('assets/images/logo.png') ?>" alt="Veda Salkar"
                        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:cursor-pointer"> -->
                        <h1 class="signature text-2xl sm:text-3xl text-black dark:text-white uppercase">Veda Salkar</h1>
                </a>
            </div>

            <div class="flex items-center gap-2 lg:gap-4">
                <!-- Desktop Menu -->
                <ul class="hidden md:flex justify-between text-black dark:text-gray-400 gap-4 lg:gap-6 xl:gap-12">
                    <?php
                    if (!str_contains($_SERVER['PHP_SELF'], '/errors/maintenance.php')) {
                        $menu = siteMenu();
                        foreach ($menu as $key => $value) {
                            echo '<li><a href="' . url($key, false) . '" class="text-sm lg:text-base text-black dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 [&.active]:underline [&.active]:underline-offset-4 dark:[&.active]:text-neon transition-colors duration-300 ' . activeUrl($key) . '" >' . $value . '</a></li>';
                        }
                    }
                    ?>
                </ul>
                
                <!-- Desktop CTA Button -->
                <a href="mailto:<?= strtolower(CONTACT_EMAIL) ?>" target="_blank"
                    class="hidden md:block hover:cursor-pointer bg-gray-500 text-gray-200 dark:bg-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-800 font-bold py-2 px-3 lg:px-4 rounded-lg transition-colors duration-300 text-sm lg:text-base">
                    Get in Touch
                </a>

                <!-- Theme toggle --> 
                <button type="button" id="theme-toggle"
                    class="p-2 text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    aria-label="Toggle theme">
                    <!-- Sun icon for dark mode -->
                    <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                    <!-- Moon icon for light mode -->
                    <svg id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                </button>

                <!-- Mobile Hamburger Button -->
                <button id="mobile-menu-button"
                    class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                    aria-label="Toggle mobile menu">
                    <svg id="hamburger-icon" class="w-6 h-6 transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg id="close-icon" class="w-6 h-6 hidden transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu"
            class="md:hidden absolute top-full left-0 right-0 mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible transform -translate-y-2 transition-all duration-300 ease-in-out z-50">
            <div class="py-4">
                <?php
                if (!str_contains($_SERVER['PHP_SELF'], '/errors/maintenance.php')) {
                    $menu = siteMenu();
                    foreach ($menu as $key => $value) {
                        echo '<a href="' . url($key, false) . '" class="mobile-menu-link block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white [&.active]:text-blue-600 dark:[&.active]:text-neon [&.active]:bg-blue-50 dark:[&.active]:bg-gray-800 transition-colors duration-200 ' . activeUrl($key) . '">' . $value . '</a>';
                    }
                }
                ?>
                <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 mt-2">
                    <a href="mailto:<?= strtolower(CONTACT_EMAIL) ?>" target="_blank"
                        class="block w-full text-center bg-gray-500 text-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600 font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    </nav>
</header>