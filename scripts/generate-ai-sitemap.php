<?php
/**
 * AI-Friendly Sitemap Generator
 * Generates ai-sitemap.xml — an enriched, semantically rich sitemap designed for
 * AI crawlers (GPTBot, PerplexityBot, CCBot, etc.) and LLM-based search agents.
 *
 * Extends the standard sitemap format with a custom <ai:*> namespace providing:
 *   - content type, author, language
 *   - human-readable descriptions and topics
 *   - audience signals
 *
 * Run from CLI: php scripts/generate-ai-sitemap.php
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('This script must be run from the command line.' . PHP_EOL);
}

require_once __DIR__ . '/../includes/common.php';

// ----- Helpers -----

function xe(string $value): string
{
    return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

/**
 * Build an <ai:topics> block from an array of topic strings.
 * Returns an empty string if $topics is empty.
 */
function aiTopicsBlock(array $topics, string $indent = '        '): string
{
    if (empty($topics)) {
        return '';
    }
    $lines = $indent . "<ai:topics>\n";
    foreach ($topics as $topic) {
        $lines .= $indent . '    <ai:topic>' . xe($topic) . "</ai:topic>\n";
    }
    $lines .= $indent . "</ai:topics>\n";
    return $lines;
}

/**
 * Render a full <url> entry with AI metadata.
 */
function aiUrl(
    string $loc,
    string $lastmod,
    string $changefreq,
    string $priority,
    string $contentType,
    string $title,
    string $description,
    string $author,
    string $audience,
    array  $topics
): string {
    $out  = "    <url>\n";
    $out .= "        <loc>" . xe($loc) . "</loc>\n";
    $out .= "        <lastmod>{$lastmod}</lastmod>\n";
    $out .= "        <changefreq>{$changefreq}</changefreq>\n";
    $out .= "        <priority>{$priority}</priority>\n";
    $out .= "        <ai:content-type>" . xe($contentType) . "</ai:content-type>\n";
    $out .= "        <ai:title>" . xe($title) . "</ai:title>\n";
    $out .= "        <ai:description>" . xe($description) . "</ai:description>\n";
    $out .= "        <ai:author>" . xe($author) . "</ai:author>\n";
    $out .= "        <ai:language>en</ai:language>\n";
    $out .= "        <ai:audience>" . xe($audience) . "</ai:audience>\n";
    $out .= aiTopicsBlock($topics);
    $out .= "    </url>\n";
    return $out;
}

// ----- Build XML -----

$author   = 'Veda Salkar';
$today    = date('Y-m-d');
$siteRoot = 'https://www.salkarveda.com';

ob_start();

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<!-- AI-Friendly Sitemap for ' . $siteRoot . ' -->' . "\n";
echo '<!-- Generated: ' . date('Y-m-d H:i:s') . ' -->' . "\n";
?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:ai="https://www.salkarveda.com/ns/ai-sitemap/1.0">

    <!--
        Site overview — for AI agents that read the XML as a whole
        Name:        Veda Salkar Portfolio
        Author:      Veda Salkar
        Language:    en
        Description: Personal portfolio of Veda Salkar, a Software Engineer and Full Stack Developer.
                     Contains project case studies, blog stories, and professional background.
    -->

<?php

// ── Static pages ────────────────────────────────────────────────────────────

echo aiUrl(
    $siteRoot . '/',
    $today, 'weekly', '1.0',
    'homepage',
    'Veda Salkar – Software Engineer & Full Stack Developer',
    'The personal portfolio homepage of Veda Salkar, a Software Engineer and Full Stack Developer. '
    . 'Showcases professional projects, blog stories, skills, and contact information.',
    $author,
    'recruiters, hiring managers, developers, collaborators',
    ['software engineering', 'full stack development', 'portfolio', 'PHP', 'JavaScript']
);

echo aiUrl(
    $siteRoot . '/about',
    $today, 'monthly', '0.9',
    'webpage',
    'About Veda Salkar – Background & Experience',
    'Detailed professional and educational background of Veda Salkar. '
    . 'Covers academic history at the University of Huddersfield, career journey, '
    . 'technical skills, and personal ethos.',
    $author,
    'recruiters, hiring managers, researchers',
    ['biography', 'software engineering', 'education', 'career', 'University of Huddersfield']
);

echo aiUrl(
    $siteRoot . '/projects',
    $today, 'weekly', '0.8',
    'portfolio-index',
    'Projects by Veda Salkar – Software Development Portfolio',
    'Index of all software development projects by Veda Salkar. '
    . 'Includes web applications, automation tools, AI integrations, and enterprise systems.',
    $author,
    'recruiters, developers, clients, researchers',
    ['projects', 'software development', 'portfolio', 'web applications', 'case studies']
);

echo aiUrl(
    $siteRoot . '/blogs',
    $today, 'weekly', '0.7',
    'blog-index',
    'Blog & Stories by Veda Salkar – Tech Insights',
    'Index of blog posts and stories written by Veda Salkar covering software engineering practices, '
    . 'career insights, technology trends, and personal professional experiences.',
    $author,
    'developers, students, professionals, tech enthusiasts',
    ['blog', 'tech writing', 'software engineering', 'career development', 'technology']
);

echo aiUrl(
    $siteRoot . '/contact',
    $today, 'monthly', '0.6',
    'contact-page',
    'Contact Veda Salkar – Get in Touch',
    'Contact page for Veda Salkar. '
    . 'Use this page to reach out for project collaborations, job opportunities, or general enquiries.',
    $author,
    'recruiters, clients, collaborators',
    ['contact', 'hire', 'collaboration', 'enquiry']
);

// ── Dynamic: Project pages ───────────────────────────────────────────────────

if (function_exists('cmsoneArticleList')) {
    $projects = cmsoneArticleList('project');
    foreach ($projects as $project) {
        if (empty($project['slug'])) continue;

        $lastmod = !empty($project['publishedAt'])
            ? date('Y-m-d', strtotime($project['publishedAt']))
            : $today;

        $title = $project['title'] ?? 'Project by Veda Salkar';

        $description = $project['excerpt'] ?? '';
        if (empty($description)) {
            $description = 'A software development project case study by Veda Salkar: ' . $title . '.';
        }

        // Build topics from tags if available, fallback to sensible defaults
        $topics = [];
        if (!empty($project['tags']) && is_array($project['tags'])) {
            $topics = array_values($project['tags']);
        }
        if (empty($topics)) {
            $topics = ['software development', 'case study', 'project', 'engineering'];
        }

        echo aiUrl(
            $siteRoot . '/projects/' . rawurlencode($project['slug']),
            $lastmod, 'monthly', '0.7',
            'project-case-study',
            $title,
            $description,
            $author,
            'recruiters, developers, clients, researchers',
            $topics
        );
    }
}

// ── Dynamic: Blog / Story pages ──────────────────────────────────────────────

if (function_exists('cmsoneArticleList')) {
    $stories = cmsoneArticleList('blog');
    foreach ($stories as $story) {
        if (empty($story['slug'])) continue;

        $lastmod = !empty($story['publishedAt'])
            ? date('Y-m-d', strtotime($story['publishedAt']))
            : $today;

        $title = $story['title'] ?? 'Blog post by Veda Salkar';

        $description = $story['excerpt'] ?? '';
        if (empty($description)) {
            $description = 'A blog story by Veda Salkar: ' . $title . '.';
        }

        $topics = [];
        if (!empty($story['tags']) && is_array($story['tags'])) {
            $topics = array_values($story['tags']);
        }
        if (empty($topics)) {
            $topics = ['blog', 'software engineering', 'career', 'technology'];
        }

        echo aiUrl(
            $siteRoot . '/blogs/' . rawurlencode($story['slug']),
            $lastmod, 'monthly', '0.6',
            'blog-article',
            $title,
            $description,
            $author,
            'developers, students, professionals, tech enthusiasts',
            $topics
        );
    }
}

?>
</urlset>
<?php

$xml    = ob_get_clean();
$output = __DIR__ . '/../ai-sitemap.xml';
$bytes  = file_put_contents($output, $xml);

if ($bytes === false) {
    fwrite(STDERR, 'Error: failed to write ' . $output . PHP_EOL);
    exit(1);
}

echo 'ai-sitemap.xml updated (' . $bytes . ' bytes)' . PHP_EOL;
