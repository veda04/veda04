<?php

function dfa($arr, $exit = true) {
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
    if ($exit) {
        exit;
    }
}

function redirect($url, $session_key='', $session_message = []) {
    
    if ($session_key && $session_message) {
        $_SESSION[$session_key] = $session_message;
    }

    header('Location: ' . APP_URL . $url);
    exit;
}

function url($url, $print=true) {
    if ($print) {
        echo APP_URL . '/' . $url;
    }
    else {
        return APP_URL . '/' . $url;
    }
}

function activeUrl($url) {
    $path  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', $path);
    
    if(APP_ENV == "local") {
        # drop key = 1 and re-index the array
        array_shift($parts);
    }

    return basename($parts[1]) == $url ? "active" : "";
}

// cut words
function cutWords($string, $length = 100, $append = '...') {
    $string = strip_tags($string);
    if (strlen($string) > $length) {
        $string = substr($string, 0, $length);
        $string = substr($string, 0, strrpos($string, ' '));
        $string .= $append;
    }
    
    return $string;
}

function show_alert_message($session_key) {
    if (!isset($_SESSION)) {
        session_start();
    }

    if (isset($_SESSION[$session_key])) {
        $type = $session_key ?? 'error';
        $message = $_SESSION[$session_key] ?? "An error occurred.";
        
        $classes = [
            'success' => 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded',
            'info' => 'bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded',
            'warning' => 'bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded',
            'error' => 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'
        ];
        
        $class = $classes[$type] ?? $classes['error'];
        
        echo "<div class='$class'>";
        echo $message;
        echo "</div>";
        unset($_SESSION[$session_key]);
    }
}

function image_src($src, $print=true, $default = 'assets/images/default.jpg')
{
    $filePath = BASE_URL . $src;

    if (file_exists($filePath) && !is_dir($filePath)) {
        return url($src, $print);
    } else {
        return url($default, $print);
    }
}

function siteMenu()
{
    $menu = [
        '' => 'Home',
        'about' => 'About',
        'projects' => 'Work',
        'blogs' => 'Stories',
        'contact' => 'Contact',
    ];

    return $menu;
}

function dateDiff($date1, $date2)
{
    $diff = abs(strtotime($date2) - strtotime($date1));

    $years = floor($diff / (365*60*60*24));
    $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
    $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24) / (60*60*24));

    return [
        'years' => $years,
        'months' => $months,
        'days' => $days,
    ];
}

function cmsone_imagehandler($src, $print=true, $default = 'assets/images/default.jpg')
{
    $url = CMS_ONE_URL . '/' . $src;
    
    $headers = @get_headers($url);
    $exists = $headers && strpos($headers[0], '200') !== false;
    
    if ($exists) {
        return $url;
    } else {
        return url($default, $print);
    }
}

/**
 * Render a Tiptap/ProseMirror JSON content string to HTML.
 */
function renderTiptapBlocks($jsonString)
{
    if (empty($jsonString)) return '';

    $doc = is_array($jsonString) ? $jsonString : json_decode($jsonString, true);
    if (json_last_error() !== JSON_ERROR_NONE || empty($doc)) return '';

    return renderTiptapNode($doc);
}

function renderTiptapNode($node, $unwrapParagraph = false)
{
    if (!is_array($node) || !isset($node['type'])) return '';

    $type     = $node['type'];
    $attrs    = isset($node['attrs'])    ? $node['attrs']    : [];
    $children = isset($node['content']) ? $node['content'] : [];

    switch ($type) {
        case 'doc':
            $out = '';
            foreach ($children as $child) {
                $out .= renderTiptapNode($child);
            }
            return $out;

        case 'heading':
            $level = max(1, min(6, isset($attrs['level']) ? intval($attrs['level']) : 2));
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child);
            }
            $classMap = [
                1 => 'text-3xl sm:text-4xl font-bold mt-10 mb-4 text-gray-900 dark:text-white',
                2 => 'text-2xl sm:text-3xl font-bold mt-8 mb-3 text-gray-900 dark:text-white',
                3 => 'text-xl sm:text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white',
                4 => 'text-lg sm:text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white',
                5 => 'text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white',
                6 => 'text-sm font-semibold mt-4 mb-2 text-gray-600 dark:text-gray-400',
            ];
            return "<h{$level} class=\"{$classMap[$level]}\">{$inner}</h{$level}>\n";

        case 'paragraph':
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child);
            }
            if ($unwrapParagraph) return $inner;
            if (empty(trim(strip_tags($inner)))) return "<p class=\"mb-4\">&nbsp;</p>\n";
            return "<p class=\"text-base sm:text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-300\">{$inner}</p>\n";

        case 'bulletList':
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child);
            }
            return "<ul class=\"list-disc list-outside pl-5 sm:pl-6 mb-5 space-y-1.5 text-base sm:text-lg text-gray-800 dark:text-gray-300\">{$inner}</ul>\n";

        case 'orderedList':
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child);
            }
            return "<ol class=\"list-decimal list-outside pl-5 sm:pl-6 mb-5 space-y-1.5 text-base sm:text-lg text-gray-800 dark:text-gray-300\">{$inner}</ol>\n";

        case 'listItem':
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child, $child['type'] === 'paragraph');
            }
            return "<li class=\"leading-relaxed\">{$inner}</li>\n";

        case 'blockquote':
            $inner = '';
            foreach ($children as $child) {
                $inner .= renderTiptapNode($child, $child['type'] === 'paragraph');
            }
            return "<blockquote class=\"border-l-4 border-blue-500 dark:border-blue-400 pl-4 sm:pl-6 my-6 py-2 italic text-gray-700 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg\">{$inner}</blockquote>\n";

        case 'codeBlock':
            $lang = isset($attrs['language']) ? htmlspecialchars($attrs['language']) : '';
            $code = '';
            foreach ($children as $child) {
                if (isset($child['text'])) $code .= htmlspecialchars($child['text']);
            }
            $langAttr = $lang ? " class=\"language-{$lang}\"" : '';
            return "<pre class=\"bg-gray-100 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto mb-6\"><code{$langAttr} class=\"text-sm font-mono text-gray-800 dark:text-gray-200\">{$code}</code></pre>\n";

        case 'image':
            $src   = isset($attrs['src'])   ? htmlspecialchars($attrs['src'])   : '';
            $alt   = isset($attrs['alt'])   ? htmlspecialchars($attrs['alt'])   : '';
            $title = !empty($attrs['title']) ? ' title="' . htmlspecialchars($attrs['title']) . '"' : '';
            if (empty($src)) return '';
            $caption = $alt ? "<figcaption class=\"text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic\">{$alt}</figcaption>" : '';
            return "<figure class=\"my-8\">\n<img src=\"{$src}\" alt=\"{$alt}\"{$title} class=\"w-full rounded-xl shadow-lg\" loading=\"lazy\">\n{$caption}</figure>\n";

        case 'videoEmbed':
            $src = isset($attrs['src']) ? htmlspecialchars($attrs['src']) : '';
            if (empty($src)) return '';
            // YouTube / Vimeo → <iframe>, everything else → <video>
            if (preg_match('/youtube\.com|youtu\.be/i', $src)) {
                preg_match('/(?:v=|youtu\.be\/)([a-zA-Z0-9_\-]{11})/', $src, $m);
                $vid = $m[1] ?? '';
                if (!$vid) return '';
                $embed = 'https://www.youtube.com/embed/' . $vid;
                return "<figure class=\"my-8 rounded-xl overflow-hidden shadow-lg\">"
                     . "<div class=\"relative w-full\" style=\"padding-top:56.25%\">"
                     . "<iframe src=\"{$embed}\" class=\"absolute inset-0 w-full h-full\" frameborder=\"0\" "
                     . "allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" "
                     . "allowfullscreen loading=\"lazy\"></iframe></div></figure>\n";
            }
            if (preg_match('/vimeo\.com/i', $src)) {
                preg_match('/vimeo\.com\/(\d+)/i', $src, $m);
                $vid = $m[1] ?? '';
                if (!$vid) return '';
                $embed = 'https://player.vimeo.com/video/' . $vid;
                return "<figure class=\"my-8 rounded-xl overflow-hidden shadow-lg\">"
                     . "<div class=\"relative w-full\" style=\"padding-top:56.25%\">"
                     . "<iframe src=\"{$embed}\" class=\"absolute inset-0 w-full h-full\" frameborder=\"0\" "
                     . "allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen loading=\"lazy\"></iframe>"
                     . "</div></figure>\n";
            }
            // Direct video file (mp4, webm, ogg, mov, etc.)
            return "<figure class=\"my-8\">"
                 . "<video src=\"{$src}\" controls preload=\"metadata\" "
                 . "class=\"w-full rounded-xl shadow-lg max-h-[560px]\"></video></figure>\n";

        case 'horizontalRule':
            return "<hr class=\"my-8 border-t-2 border-gray-200 dark:border-gray-700\">\n";

        case 'hardBreak':
            return "<br>\n";

        case 'text':
            $text = htmlspecialchars(isset($node['text']) ? $node['text'] : '');
            foreach (isset($node['marks']) ? $node['marks'] : [] as $mark) {
                switch ($mark['type']) {
                    case 'bold':
                        $text = "<strong class=\"font-semibold text-gray-900 dark:text-white\">{$text}</strong>";
                        break;
                    case 'italic':
                        $text = "<em>{$text}</em>";
                        break;
                    case 'underline':
                        $text = "<u>{$text}</u>";
                        break;
                    case 'strike':
                        $text = "<s class=\"line-through\">{$text}</s>";
                        break;
                    case 'code':
                        $text = "<code class=\"bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400\">{$text}</code>";
                        break;
                    case 'link':
                        $href   = isset($mark['attrs']['href'])   ? htmlspecialchars($mark['attrs']['href'])   : '#';
                        $target = !empty($mark['attrs']['target']) ? htmlspecialchars($mark['attrs']['target']) : '_blank';
                        $rel    = $target === '_blank' ? ' rel="noopener noreferrer"' : '';
                        $text   = "<a href=\"{$href}\" target=\"{$target}\"{$rel} class=\"text-blue-600 dark:text-blue-400 hover:underline\">{$text}</a>";
                        break;
                }
            }
            return $text;

        default:
            $out = '';
            foreach ($children as $child) {
                $out .= renderTiptapNode($child);
            }
            return $out;
    }
}