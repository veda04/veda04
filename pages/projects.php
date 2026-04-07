<?php
require_once __DIR__ . '/../includes/common.php'; // Common functions and configurations
$HAS_NAV_BAR = true; // Flag to indicate that the navigation bar should be included

// SEO configuration for the projects page
$SEO = [
    'title' => 'Projects by Veda Salkar | Portfolio',
    'description' => 'Software development portfolio featuring web applications, mobile apps, and AI/ML solutions for leading clients and institutions.',
    'keywords' => 'veda salkar projects, software development projects, web applications, mobile apps, university huddersfield projects, Dash software, Veevee website, cosmokode projects',
    'image' => url('assets/images/og-image.png', false),
    'url' => url('projects', false),
];

require_once __DIR__ . '/../partials/header.php';
$filterCategory = isset($_GET['category']) ? trim($_GET['category']) : null;
$filterTag      = isset($_GET['tag'])      ? trim($_GET['tag'])      : null;
$projects = cmsoneArticleList($filterCategory ?? 'project', $filterTag, 9, 1);
$hasMore  = count($projects) > 8;
$projects = array_slice($projects, 0, 8);

// if no projects found, show a message
if (empty($projects)) {
    echo '<p class="text-center text-gray-500 dark:text-gray-400">No projects found.</p>';
    require_once __DIR__ . '/../partials/footer.php';
    exit;
}
?>

<section id="projects" class="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
    <div class="relative py-12 mb-12 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Radial gradient background with blur effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" 
             style="background: radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);"></div>
        <div class="absolute inset-0 backdrop-blur-[2px]" style="mask-image: radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%); -webkit-mask-image: radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%);"></div>
        
        <h1 class="relative text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-4 sm:pb-6 lg:pb-8 pt-8 px-4 text-gray-900 dark:text-white">My Projects</h1>
    </div>

    <?php if ($filterTag || $filterCategory): ?>
    <div class="flex items-center justify-center gap-2 mb-4 flex-wrap">
        <span class="text-sm text-gray-500 dark:text-gray-400">Filtered by:</span>
        <?php if ($filterTag): ?>
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <i class="fas fa-tag text-xs"></i>
            <?= htmlspecialchars($filterTag) ?>
        </span>
        <?php endif; ?>
        <?php if ($filterCategory): ?>
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <i class="fas fa-folder-open text-xs"></i>
            <?= htmlspecialchars($filterCategory) ?>
        </span>
        <?php endif; ?>
        <a href="<?= url('projects', false) ?>" class="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            &times; Clear filter
        </a>
    </div>
    <?php endif; ?>
        <div id="article-grid"
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
             data-category="project"
             data-tag="<?= htmlspecialchars($filterTag ?? '') ?>"
             data-page="1"
             data-limit="8"
             data-url-prefix="<?= url('projects', false) ?>">
            <?php foreach ($projects as $project) : ?>
                <div class="w-full" data-aos="fade-up" data-aos-delay="100">
                    <!-- Mobile Device Frame -->
                    <div class="bg-gray-900 dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-gray-800 dark:border-gray-950 hover:shadow-olive/20 dark:hover:shadow-neon/20 transition-all duration-300 min-h-[500px] flex flex-col relative">
                        <!-- Device Notch/Camera -->
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-950 rounded-b-2xl z-10 flex items-center justify-center">
                            <div class="w-12 h-1.5 bg-gray-700 dark:bg-gray-900 rounded-full"></div>
                        </div>
                        
                        <!-- Tab Bar -->
                        <div class="bg-gray-800 dark:bg-gray-900 px-4 pt-8 pb-2 flex items-center gap-2 border-b border-gray-700 dark:border-gray-800">
                            <!-- <div class="bg-gray-700 dark:bg-gray-800 rounded-t-lg px-4 py-2 text-xs text-gray-300 dark:text-gray-400 max-w-[140px] truncate flex items-center gap-2">
                                <div class="w-2 h-2 bg-olive dark:bg-neon rounded-full"></div>
                                <?= cutwords($project['title'], 20) ?>
                            </div> -->
                        </div>
                        
                        <!-- Screen Content - Vertical Layout -->
                        <div class="bg-white dark:bg-gray-900 flex flex-col h-full flex-1 overflow-hidden">
                            <!-- Image Top -->
                            <div class="w-full h-48 sm:h-56 overflow-hidden">
                                <img src="<?= htmlspecialchars($project['featuredImage']) ?>" 
                                     alt="<?= htmlspecialchars($project['featuredImageAlt'] ?: $project['title']) ?>" 
                                     loading="lazy"
                                     decoding="async"
                                     width="400"
                                     height="224"
                                     class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                            </div>
                            
                            <!-- Content Bottom -->
                            <div class="p-4 sm:p-6 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 class="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                        <?= cutwords($project['title'], 60) ?>
                                    </h3>
                                    
                                    <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                                        <?= cutwords($project['excerpt'], 100) ?>
                                    </p>
                                </div>
                                
                                <a class="inline-flex items-center gap-2 text-sm sm:text-base text-olive dark:text-neon hover:text-olive-dark dark:hover:text-neon transition-colors duration-300 font-medium group" 
                                   href="<?= url('projects/'.$project['slug'], false) ?>">
                                   <span>Read more</span>
                                   <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                   </svg>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Device Home Indicator -->
                        <div class="bg-white dark:bg-gray-900 pb-2 flex justify-center">
                            <div class="w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php if ($hasMore): ?>
    <div id="scroll-sentinel" class="py-8 flex justify-center">
        <div id="scroll-loader" class="hidden w-8 h-8 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 animate-spin"></div>
    </div>
    <?php endif; ?>
    <?php include __DIR__ . '/../partials/copyrights.php'; ?>
</section>

<?php
require_once __DIR__ . '/../partials/footer.php';
?>