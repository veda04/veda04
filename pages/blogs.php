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

<section id="blogs" class="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
    <h1 class="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-4 sm:pb-6 lg:pb-8 px-4 text-gray-900 dark:text-white">Blogs</h1>

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
                        <div class="relative rounded-2xl overflow-hidden h-[400px] border border-white/10 backdrop-blur-sm hover:border-neon/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon/20">
                            <!-- Background Image -->
                            <img src="<?= htmlspecialchars($blog['featuredImage']) ?>" 
                                 alt="<?= htmlspecialchars($blog['featuredImageAlt'] ?: $blog['title']) ?>" 
                                 class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            
                            <!-- Dark Gradient Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
                            
                            <!-- Content -->
                            <div class="relative h-full flex flex-col justify-between p-6">
                                <div>
                                    <h3 class="text-neon text-lg sm:text-xl font-bold mb-3 group-hover:text-neon-light transition-colors duration-300">
                                        <?= htmlspecialchars($blog['title']) ?>
                                    </h3>
                                    
                                    <p class="text-white/80 text-sm sm:text-base leading-tight">
                                        <?= cutwords($blog['excerpt'], 100) ?>
                                    </p>
                                </div>
                                
                                <!-- Read More Button -->
                                <div class="flex items-center gap-2 text-neon text-sm font-medium group-hover:gap-3 transition-all duration-300">
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
</section>

<?php
require_once __DIR__ . '/../partials/footer.php';
?>