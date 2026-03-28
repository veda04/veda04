<?php
/**
 * Articles API endpoint
 * Returns paginated article data as JSON for infinite scroll.
 * GET /api/articles?category=project|blog&tag=...&page=N&limit=N
 */

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../includes/common.php';

// Validate category against a strict whitelist
$allowed_categories = ['project', 'blog'];
$category = isset($_GET['category']) && in_array($_GET['category'], $allowed_categories, true)
    ? $_GET['category']
    : null;

// Sanitise tag — passed as a query param to the external CMS API
$tag   = isset($_GET['tag']) ? trim($_GET['tag']) : null;
$tag   = ($tag !== '' && $tag !== null) ? $tag : null;

// Clamp page and limit to safe ranges
$page  = max(1, (int) ($_GET['page']  ?? 1));
$limit = min(20, max(1, (int) ($_GET['limit'] ?? 8)));

// Fetch one extra item to determine whether another page exists
$articles = cmsoneArticleList($category, $tag, $limit + 1, $page);
$hasMore  = count($articles) > $limit;
$articles = array_slice($articles, 0, $limit);

// Return only the fields the front-end needs
$safe = array_map(function (array $a): array {
    return [
        'slug'             => $a['slug']             ?? '',
        'title'            => $a['title']            ?? '',
        'excerpt'          => $a['excerpt']          ?? '',
        'featuredImage'    => $a['featuredImage']    ?? '',
        'featuredImageAlt' => $a['featuredImageAlt'] ?? '',
    ];
}, $articles);

header('Content-Type: application/json');
echo json_encode(['success' => true, 'articles' => $safe, 'hasMore' => $hasMore]);
