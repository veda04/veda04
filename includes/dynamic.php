<?php

$CONN = DBConnect(DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD);

/**
 * Simple file-based cache for CMS One API responses.
 * Pass $value to write, omit $value (null) to read.
 * Returns null on cache miss.
 */
function _cmsCache($key, $value = null, $ttl = 7200)
{
    if (!CMS_CACHE_ENABLED) {
        return null;
    }

    $dir = rtrim(BASE_URL, '/\\') . DIRECTORY_SEPARATOR . '.cache';

    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
        // Block direct HTTP access
        @file_put_contents($dir . DIRECTORY_SEPARATOR . '.htaccess', "Deny from all\n");
    }

    $file = $dir . DIRECTORY_SEPARATOR . 'cms_' . $key . '.json';

    // Write
    if ($value !== null) {
        @file_put_contents($file, json_encode(['e' => time() + $ttl, 'v' => $value]), LOCK_EX);
        return $value;
    }

    // Read
    if (!file_exists($file)) return null;
    $raw = @file_get_contents($file);
    if ($raw === false) return null;
    $data = json_decode($raw, true);
    if (!$data || $data['e'] < time()) {
        @unlink($file);
        return null;
    }
    return $data['v'];
}

function cmsoneArticleList($category = null, $tag = null, $limit = 20, $page = 1)
{
    $cacheKey = 'articles_list_' . md5($category . $tag . $limit . $page);
    $cached   = _cmsCache($cacheKey);
    if ($cached !== null) return $cached;

    $api = new API(CMS_ONE_API_URL);
    $api->setBearerToken(CMS_ONE_API_KEY);

    $params = ['page' => $page, 'limit' => $limit];
    if ($category) {
        $params['category'] = $category;
    }
    if ($tag) {
        $params['tag'] = $tag;
    }

    $response = $api->get('articles', $params);

    if (!$response || empty($response['success']) || empty($response['data'])) {
        return [];
    }

    _cmsCache($cacheKey, $response['data']);
    return $response['data'];
}

function cmsoneArticleGet($slug)
{
    $cacheKey = 'article_' . md5($slug);
    $cached   = _cmsCache($cacheKey);
    if ($cached !== null) return $cached;

    $api = new API(CMS_ONE_API_URL);
    $api->setBearerToken(CMS_ONE_API_KEY);

    $response = $api->get('articles/' . rawurlencode($slug));

    if (!$response || empty($response['success']) || empty($response['data'])) {
        return null;
    }

    _cmsCache($cacheKey, $response['data']);
    return $response['data'];
}