<?php
require_once __DIR__ . '/../includes/common.php'; // Common functions and configurations
$HAS_NAV_BAR = true; // Flag to indicate that the navigation bar should be included

// SEO configuration for the blogs page
$SEO = [
    'title' => 'Blog & blogs | Veda Salkar',
    'description' => 'Insightful blogs about software engineering, tech experiences at University of Huddersfield, CosmoKode, and the industry.',
    'keywords' => 'veda salkar blog, software engineering blog, tech journey, university huddersfield experience, cosmokode blogs, developer blog uk',
    'image' => url('assets/images/og-image.png', false),
    'url' => url('blogs', false),
];

require_once __DIR__ . '/../partials/header.php';

$filterCategory = isset($_GET['category']) ? trim($_GET['category']) : null;
$filterTag      = isset($_GET['tag'])      ? trim($_GET['tag'])      : null;
$blogs = cmsoneArticleList($filterCategory ?? 'blog', $filterTag, 9, 1);
$hasMore  = count($blogs) > 8;
$blogs  = array_slice($blogs, 0, 8);

// if no blogs found, show a message
if (empty($blogs)) {
    echo '<p class="text-center text-gray-500 dark:text-gray-400">No blogs found.</p>';
    require_once __DIR__ . '/../partials/footer.php';
    exit;
}
?>

<section id="blogs" class="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
    <div class="relative py-12 mb-12 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Radial gradient background with blur effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" 
             style="background: radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);"></div>
        <div class="absolute inset-0 backdrop-blur-[2px]" style="mask-image: radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%); -webkit-mask-image: radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%);"></div>
        
        <h1 class="relative text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-4 sm:pb-6 lg:pb-8 pt-8 px-4 text-gray-900 dark:text-white">Blogs</h1>
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
        <a href="<?= url('blogs', false) ?>" class="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            &times; Clear filter
        </a>
    </div>
    <?php endif; ?>

        <div id="article-grid"
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
             data-category="blog"
             data-tag="<?= htmlspecialchars($filterTag ?? '') ?>"
             data-page="1"
             data-limit="8"
             data-url-prefix="<?= url('blogs', false) ?>">
            <?php foreach ($blogs as $blog) : ?>
                <div class="w-full" data-aos="fade-up" data-aos-delay="100">
                    <a href="<?= url('blogs/'.$blog['slug'], false) ?>" class="block h-full group">
                        <div class="rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-olive/40 dark:hover:border-neon/40 transition-all duration-300 hover:shadow-xl hover:shadow-olive/20 dark:hover:shadow-neon/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex flex-col h-full">
                            <!-- Image Section -->
                            <div class="relative overflow-hidden h-48">
                                <img src="<?= htmlspecialchars($blog['featuredImage']) ?>" 
                                     alt="<?= htmlspecialchars($blog['featuredImageAlt'] ?: $blog['title']) ?>" 
                                     loading="lazy"
                                     decoding="async"
                                     width="400"
                                     height="192"
                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            </div>
                            
                            <!-- Content Section with Glass Effect -->
                            <div class="flex flex-col flex-1 p-6 bg-gradient-to-b from-white/90 to-white/95 dark:from-gray-800/90 dark:to-gray-900/95 backdrop-blur-sm">
                                <h3 class="text-gray-900 dark:text-white text-lg font-bold mb-4 group-hover:text-olive dark:group-hover:text-neon transition-colors duration-300 line-clamp-3 leading-snug">
                                    <?= htmlspecialchars($blog['title']) ?>
                                </h3>
                                
                                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                                    <?= cutwords($blog['excerpt'], 100) ?>
                                </p>
                                
                                <!-- Read More Button -->
                                <div class="flex items-center gap-2 text-olive dark:text-neon text-sm font-medium group-hover:gap-3 transition-all duration-300 mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                                    <span>Read More</span>
                                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
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