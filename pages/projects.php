<?php
require_once __DIR__ . '/../includes/common.php'; // Common functions and configurations

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

<section id="projects" class="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
    <h1 class="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-4 sm:pb-6 lg:pb-8 px-4 text-gray-900 dark:text-white">My Projects</h1>

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
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
             data-category="project"
             data-tag="<?= htmlspecialchars($filterTag ?? '') ?>"
             data-page="1"
             data-limit="8"
             data-url-prefix="<?= url('projects', false) ?>">
            <?php foreach ($projects as $project) : ?>
                <div class="w-full" data-aos="fade-up" data-aos-delay="100">
                    <div class="card-bg-radial rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div class="aspect-[40/21] overflow-hidden rounded-t-lg">
                            <img src="<?= htmlspecialchars($project['featuredImage']) ?>" 
                                 alt="<?= htmlspecialchars($project['featuredImageAlt'] ?: $project['title']) ?>" 
                                 class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300">
                        </div>
                        <div class="p-4 sm:p-6 flex flex-col flex-grow">
                            <h3 class="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                <?= cutwords($project['title'], 60) ?>
                            </h3>
                            
                            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                                <?= cutwords($project['excerpt'], 120) ?>
                            </p>

                            <a class="text-right text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium" 
                               href="<?= url('projects/'.$project['slug'], false) ?>">
                               Read more →
                            </a>
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
</section>

<?php
require_once __DIR__ . '/../partials/footer.php';
?>