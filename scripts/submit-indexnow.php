<?php
/**
 * IndexNow URL Submission
 * Reads sitemap.xml and submits all URLs to IndexNow API.
 * Run from CLI: php scripts/submit-indexnow.php
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('This script must be run from the command line.' . PHP_EOL);
}

const INDEXNOW_HOST       = 'www.mrmallik.com';
const INDEXNOW_KEY        = '6a8bda1825d34cd0817b0db0c33d9370';
const INDEXNOW_KEY_LOCATION = 'https://www.mrmallik.com/6a8bda1825d34cd0817b0db0c33d9370.txt';
const INDEXNOW_API_URL    = 'https://api.indexnow.org/IndexNow';

// ----- Parse sitemap.xml -----
$sitemapPath = __DIR__ . '/../sitemap.xml';

if (!file_exists($sitemapPath)) {
    fwrite(STDERR, 'Error: sitemap.xml not found. Run generate-sitemap.php first.' . PHP_EOL);
    exit(1);
}

$xml = simplexml_load_file($sitemapPath);

if ($xml === false) {
    fwrite(STDERR, 'Error: failed to parse sitemap.xml.' . PHP_EOL);
    exit(1);
}

$urls = [];
foreach ($xml->url as $entry) {
    $loc = trim((string) $entry->loc);
    if ($loc !== '') {
        $urls[] = $loc;
    }
}

if (empty($urls)) {
    fwrite(STDERR, 'Error: no URLs found in sitemap.xml.' . PHP_EOL);
    exit(1);
}

echo 'Found ' . count($urls) . ' URL(s) in sitemap.xml.' . PHP_EOL;

// ----- Submit to IndexNow -----
$payload = json_encode([
    'host'        => INDEXNOW_HOST,
    'key'         => INDEXNOW_KEY,
    'keyLocation' => INDEXNOW_KEY_LOCATION,
    'urlList'     => $urls,
], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

$context = stream_context_create([
    'http' => [
        'method'  => 'POST',
        'header'  => implode("\r\n", [
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: ' . strlen($payload),
            'Host: api.indexnow.org',
        ]),
        'content'         => $payload,
        'ignore_errors'   => true,
        'timeout'         => 30,
    ],
]);

echo 'Submitting to IndexNow...' . PHP_EOL;

$response = file_get_contents(INDEXNOW_API_URL, false, $context);
$statusLine = $http_response_header[0] ?? 'Unknown response';

// Extract HTTP status code
preg_match('/HTTP\/\S+\s+(\d+)/', $statusLine, $matches);
$statusCode = isset($matches[1]) ? (int) $matches[1] : 0;

echo 'Response: ' . $statusLine . PHP_EOL;

if ($statusCode === 200) {
    echo 'Success: URLs accepted by IndexNow.' . PHP_EOL;
} elseif ($statusCode === 202) {
    echo 'Accepted: URLs received and will be processed.' . PHP_EOL;
} elseif ($statusCode === 400) {
    fwrite(STDERR, 'Error 400: Invalid request format.' . PHP_EOL);
    exit(1);
} elseif ($statusCode === 403) {
    fwrite(STDERR, 'Error 403: Key not valid or key file not accessible.' . PHP_EOL);
    exit(1);
} elseif ($statusCode === 422) {
    fwrite(STDERR, 'Error 422: URLs do not belong to the declared host.' . PHP_EOL);
    exit(1);
} elseif ($statusCode === 429) {
    fwrite(STDERR, 'Error 429: Too many requests. Try again later.' . PHP_EOL);
    exit(1);
} else {
    fwrite(STDERR, 'Unexpected response (HTTP ' . $statusCode . ').' . PHP_EOL);
    if ($response !== false && $response !== '') {
        fwrite(STDERR, $response . PHP_EOL);
    }
    exit(1);
}
