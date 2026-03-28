<?php
require_once __DIR__ . '/../includes/common.php';
$HAS_NAV_BAR = true; // Flag to indicate that the navigation bar should be included

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;
$type = isset($_GET['type']) ? trim($_GET['type']) : null;

if (!$slug || !$type) {
    header('Location: ' . url('404', false));
    exit;
}

$article = cmsoneArticleGet($slug);

if (!$article) {
    header('Location: ' . url('404', false));
    exit;
}

$listingPage = $type === 'project' ? 'projects' : 'blogs';
$seoTitle    = !empty($article['seo']['metaTitle'])       ? $article['seo']['metaTitle']       : $article['title'];
$seoDesc     = !empty($article['seo']['metaDescription']) ? $article['seo']['metaDescription'] : ($article['excerpt'] ?? '');
$seoKeywords = implode(', ', array_column($article['tags'] ?? [], 'name'));
$page_url    = url($listingPage . '/' . $article['slug'], false);

// Estimate read time from content
$wordCount = str_word_count(strip_tags($article['content'] ?? $article['excerpt'] ?? ''));
$readTime  = max(1, ceil($wordCount / 200));

$SEO = [
    'title'       => htmlspecialchars($seoTitle) . ' | Veda Salkar',
    'description' => htmlspecialchars($seoDesc),
    'keywords'    => $seoKeywords ?: 'veda salkar,  software engineer, fullstack developer, frontend developer, web developer',
    'image'       => !empty($article['featuredImage']) ? $article['featuredImage'] : url('assets/images/og-image.png', false),
    'image_alt'   => htmlspecialchars($article['title']),
    'url'         => $page_url,
];

require_once __DIR__ . '/../partials/header.php';

?>
<!-- Main Content -->
<article class="container mx-auto px-4 py-12 max-w-4xl">

    <!-- Article Header -->
    <header class="mb-12 fade-in">
        <!-- Category Badge -->
        <div class="mb-6">
            <?php
            foreach ($article['categories'] as $category) {
                echo '<span class="category-badge text-xs font-semibold px-4 py-2 rounded-full inline-block mr-2 mb-2">' . htmlspecialchars($category['name']) . '</span>';
            }
            ?>
        </div>

        <!-- Title -->
        <h1 class="text-white font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            <?php echo htmlspecialchars($article['title']); ?>
        </h1>

        <!-- Excerpt -->
        <p class="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
            <?php echo htmlspecialchars($article['excerpt']); ?>
        </p>

        <!-- Meta Info -->
        <div class="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
            <!-- Author -->
            <div class="flex items-center gap-3">
                <img src="<?php echo url('assets/images/profile-image.png', false); ?>"
                    alt="Veda Salkar"
                    class="w-12 h-12 rounded-full border-2 border-neon/30 object-contain">
                <div>
                    <div class="text-white font-semibold text-sm">Veda Salkar</div>
                    <div class="text-white/50 text-xs">Software Engineer</div>
                </div>
            </div>

            <!-- Date & Reading Time -->
            <div class="flex items-center gap-4 text-white/60 text-sm">
                <span><?php echo format_date_display($article['publishedAt']); ?></span>
                <span>•</span>
                <span><?php echo $readTime; ?> min read</span>
                <span>•</span>
                <span><?php echo number_format($article['readCount']); ?> views</span>
            </div>
        </div>
    </header>

    <!-- Featured Image -->
    <div class="mb-12 fade-in">
        <div class="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img src="<?php echo htmlspecialchars($article['featuredImage']); ?>"
                alt="<?php echo htmlspecialchars($article['title']); ?>" class="w-full h-full object-cover">
        </div>
    </div>

    <!-- Article Content -->
    <div class="article-content prose prose-invert max-w-none mb-12 fade-in">
        <?php echo renderTiptapBlocks($article['content']); ?>
    </div>

    <!-- Tags -->
    <div class="mb-12 pb-12 border-b border-white/10 fade-in">
        <h3 class="text-white font-semibold text-sm mb-4">Tagged with:</h3>
        <div class="flex flex-wrap gap-2">
            <?php foreach ($article['tags'] as $tag): ?>
                <span class="tag-badge text-xs font-medium px-4 py-2 rounded-full">
                    #<?php echo htmlspecialchars($tag['name']); ?>
                </span>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Share Buttons -->
    <div class="mb-16 fade-in">
        <h3 class="text-white font-semibold text-lg mb-6">Share this article</h3>
        <div class="flex flex-wrap gap-4">
            <!-- Twitter -->
            <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode($page_url); ?>&text=<?php echo urlencode($shareTitle); ?>"
                target="_blank" rel="noopener noreferrer" class="share-button">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Twitter</span>
            </a>

            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo urlencode($page_url); ?>"
                target="_blank" rel="noopener noreferrer" class="share-button">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
            </a>

            <!-- Facebook -->
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode($page_url); ?>" target="_blank"
                rel="noopener noreferrer" class="share-button">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
            </a>

            <!-- Copy Link -->
            <button onclick="copyToClipboard('<?php echo $page_url; ?>')" class="share-button">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                </svg>
                <span>Copy Link</span>
            </button>
        </div>
    </div>

    <!-- Related Posts -->
    <?php if (!empty($article['related'])): ?>
        <div class="fade-in">
            <h2 class="text-white font-display font-bold text-3xl mb-8">Related Articles</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <?php foreach ($article['related'] as $related): ?>
                    <article class="related-post-card">
                        <a href="blog-detail?slug=<?php echo htmlspecialchars($related['slug']); ?>" class="block">
                            <!-- Image -->
                            <div class="image-overlay aspect-video rounded-lg overflow-hidden mb-4">
                                <img src="<?php echo htmlspecialchars($related['featuredImage']); ?>"
                                    alt="<?php echo htmlspecialchars($related['title']); ?>" class="w-full h-full object-cover">
                            </div>

                            <!-- Content -->
                            <div>
                                <!-- Title -->
                                <h3
                                    class="text-white font-semibold text-lg mb-2 line-clamp-2 hover:text-neon transition-colors">
                                    <?php echo htmlspecialchars($related['title']); ?>
                                </h3>

                                <!-- Meta -->
                                <div class="flex items-center gap-3 text-white/50 text-xs">
                                    <span><?php echo format_date_display($related['publishedAt']); ?></span>
                                    <span>•</span>
                                    <span><?php echo $related['readCount']; ?> views</span>
                                </div>
                            </div>
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endif; ?>

</article>

<!-- JavaScript -->
<script>
    // Copy to clipboard function
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Show success message
            const button = event.currentTarget;
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Copied!</span>
                `;
            button.classList.add('success');

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('success');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
</script>
<?php require_once __DIR__ . '/../partials/footer.php'; ?>