<?php
/**
 * Sitemap Generator
 * Generates sitemap.xml from live CMS content and static pages.
 * Run from CLI: php scripts/generate-sitemap.php
 */

// Must be run from CLI
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('This script must be run from the command line.' . PHP_EOL);
}

require_once __DIR__ . '/../includes/common.php';

ob_start();

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    
    <!-- Homepage -->
    <url>
        <loc><?= url('', false); ?></loc>
        <lastmod><?= date('Y-m-d'); ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
        <image:image>
            <image:loc><?= url('assets/images/gulger-mallik@1x1.jpg', false); ?></image:loc>
            <image:title>Gulger Mallik - Software Engineer</image:title>
            <image:caption>Gulger Mallik, Software Engineer and Full Stack Developer</image:caption>
        </image:image>
    </url>
    
    <!-- About Page -->
    <url>
        <loc><?= url('about', false); ?></loc>
        <lastmod><?= date('Y-m-d'); ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc><?= url('assets/images/about-me-grad.jpg', false); ?></image:loc>
            <image:title>About Gulger Mallik</image:title>
            <image:caption>Gulger Mallik graduation photo from University of Huddersfield</image:caption>
        </image:image>
    </url>
    
    <!-- Projects Page -->
    <url>
        <loc><?= url('projects', false); ?></loc>
        <lastmod><?= date('Y-m-d'); ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        <image:image>
            <image:loc><?= url('assets/images/projects.jpeg', false); ?></image:loc>
            <image:title>Projects by Gulger Mallik</image:title>
            <image:caption>Software development projects portfolio</image:caption>
        </image:image>
    </url>
    
    <!-- Blog/Stories Page -->
    <url>
        <loc><?= url('blogs', false); ?></loc>
        <lastmod><?= date('Y-m-d'); ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        <image:image>
            <image:loc><?= url('assets/images/stories.jpeg', false); ?></image:loc>
            <image:title>Blog Stories by Gulger Mallik</image:title>
            <image:caption>Software engineering journey and tech insights</image:caption>
        </image:image>
    </url>
    
    <!-- Contact Page -->
    <url>
        <loc><?= url('contact', false); ?></loc>
        <lastmod><?= date('Y-m-d'); ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
        <image:image>
            <image:loc><?= url('assets/images/contact-me.jpg', false); ?></image:loc>
            <image:title>Contact Gulger Mallik</image:title>
            <image:caption>Get in touch with Gulger Mallik for software development projects</image:caption>
        </image:image>
    </url>
    
    <?php
    // Dynamic project pages
    if (function_exists('cmsoneArticleList')) {
        $projects = cmsoneArticleList('project');
        foreach ($projects as $project) {
            if (empty($project['slug'])) continue;
            echo "<url>\n";
            echo "    <loc>" . url('projects/' . $project['slug'], false) . "</loc>\n";
            echo "    <lastmod>" . (!empty($project['publishedAt']) ? date('Y-m-d', strtotime($project['publishedAt'])) : date('Y-m-d')) . "</lastmod>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.7</priority>\n";
            if (!empty($project['featuredImage'])) {
                echo "    <image:image>\n";
                echo "        <image:loc>" . htmlspecialchars($project['featuredImage']) . "</image:loc>\n";
                echo "        <image:title>" . htmlspecialchars($project['title']) . "</image:title>\n";
                echo "        <image:caption>" . htmlspecialchars($project['excerpt'] ?? '') . "</image:caption>\n";
                echo "    </image:image>\n";
            }
            echo "</url>\n";
        }
    }
    
    // Dynamic blog/story pages
    if (function_exists('cmsoneArticleList')) {
        $stories = cmsoneArticleList('blog');
        foreach ($stories as $story) {
            if (empty($story['slug'])) continue;
            echo "<url>\n";
            echo "    <loc>" . url('blogs/' . $story['slug'], false) . "</loc>\n";
            echo "    <lastmod>" . (!empty($story['publishedAt']) ? date('Y-m-d', strtotime($story['publishedAt'])) : date('Y-m-d')) . "</lastmod>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.6</priority>\n";
            if (!empty($story['featuredImage'])) {
                echo "    <image:image>\n";
                echo "        <image:loc>" . htmlspecialchars($story['featuredImage']) . "</image:loc>\n";
                echo "        <image:title>" . htmlspecialchars($story['title']) . "</image:title>\n";
                echo "        <image:caption>" . htmlspecialchars($story['excerpt'] ?? '') . "</image:caption>\n";
                echo "    </image:image>\n";
            }
            echo "</url>\n";
        }
    }
    ?>
    
</urlset>
<?php

$xml      = ob_get_clean();
$output   = __DIR__ . '/../sitemap.xml';
$bytes    = file_put_contents($output, $xml);

if ($bytes === false) {
    fwrite(STDERR, 'Error: failed to write ' . $output . PHP_EOL);
    exit(1);
}

echo 'sitemap.xml updated (' . $bytes . ' bytes)' . PHP_EOL;
