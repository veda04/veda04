<?php
require_once __DIR__ . '/../includes/common.php'; # config file

$defaultSeo = [
    'title' => 'Veda Salkar aka Miss. Salkar',
    'description' => 'Veda Salkar is a Software Engineer and a Fullstack developer.',
    'keywords' => 'veda salkar,  veda, salkar, software engineer, fullstack developer, web developer, frontend developer',
    'image' => url('assets/images/og-image.png', false),
    'url' => url('', false),
];

// merge if SEO is already set
if (isset($SEO) && is_array($SEO)) {
    $SEO = array_merge($defaultSeo, $SEO);
} else {
    $SEO = $defaultSeo;
}

?>
<!DOCTYPE html>
<html lang="en" class="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- CMS One Analytics -->
    <script>
        // (function() {
        //     var script = document.createElement('script');
        //     script.src = 'https://cmsone.cosmokode.com/api/analytics/script.js';
        //     script.dataset.token = '5c2d16f01f3126dab56da88a745762ff';
        //     script.async = true;
        //     document.head.appendChild(script);
        // })();
    </script>

    <!-- Canonical URL -->
    <link rel="canonical" href="<?= htmlspecialchars($SEO['url']); ?>">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://res.cloudinary.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://code.jquery.com">
    <link rel="dns-prefetch" href="https://res.cloudinary.com">
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://code.jquery.com">

    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
        media="print" onload="this.media='all'">
    <noscript><link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"></noscript>

    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/x-icon" href="<?= url('favicon.ico', false) ?>" />
    <link rel="shortcut icon" type="image/x-icon" href="<?= url('favicon.ico', false) ?>" />
    <link rel="apple-touch-icon" sizes="180x180" href="<?= url('apple-touch-icon.png', false) ?>" />
    <link rel="icon" type="image/png" sizes="32x32" href="<?= url('favicon-32x32.png', false) ?>" />
    <link rel="icon" type="image/png" sizes="16x16" href="<?= url('favicon-16x16.png', false) ?>" />
    <link rel="manifest" href="<?= url('site.webmanifest', false) ?>" />
    <link rel="mask-icon" href="<?= url('safari-pinned-tab.svg', false) ?>" color="#5bbad5" />

    <!-- Additional favicon formats for better compatibility -->
    <meta name="msapplication-TileImage" content="<?= url('favicon-32x32.png', false) ?>" />
    <meta name="msapplication-config" content="<?= url('browserconfig.xml', false) ?>" />

    <!-- App Configuration -->
    <meta name="apple-mobile-web-app-title" content="Veda Salkar" />
    <meta name="application-name" content="Veda Salkar" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#000000" />

    <!-- Favicon optimization for search engines -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    <!-- SEO Meta Tags -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="bingbot" content="index, follow" />
    <meta name="language" content="en" />
    <meta name="geo.region" content="UK" />
    <meta name="geo.placename" content="United Kingdom" />

    <title><?= htmlspecialchars($SEO['title']); ?></title>
    <meta name="description" content="<?= htmlspecialchars($SEO['description']); ?>">
    <meta name="keywords" content="<?= htmlspecialchars($SEO['keywords']); ?>">
    <meta name="author" content="Veda Salkar">

    <!-- Open Graph Tags -->
    <meta property="og:title" content="<?= htmlspecialchars($SEO['title']); ?>">
    <meta property="og:description" content="<?= htmlspecialchars($SEO['description']); ?>">
    <meta property="og:image" content="<?= htmlspecialchars($SEO['image']); ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?= htmlspecialchars($SEO['title']); ?>">
    <meta property="og:url" content="<?= htmlspecialchars($SEO['url']); ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Veda Salkar">
    <meta property="og:locale" content="en_GB">

    <!-- Twitter Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($SEO['title']); ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($SEO['description']); ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($SEO['image']); ?>">
    <meta name="twitter:image:alt" content="<?= htmlspecialchars($SEO['title']); ?>">
    <meta name="twitter:site" content="@vedasalkar">
    <meta name="twitter:creator" content="@vedasalkar">
    <meta name="twitter:url" content="<?= htmlspecialchars($SEO['url']); ?>">

    <!-- Additional SEO Meta Tags -->
    <meta name="format-detection" content="telephone=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <!-- Rich Snippets -->
    <meta property="profile:first_name" content="Veda">
    <meta property="profile:last_name" content="Salkar">
    <meta property="profile:username" content="salkarveda">

    <!-- LinkedIn -->
    <meta property="article:author" content="<?php echo SOCIAL_LINKEDIN; ?>">

    <!-- Company/Organization Tags -->
    <meta name="company" content="CosmoKode Ltd">
    <meta name="industry" content="Software Development">
    <meta name="location" content="United Kingdom">

    <!-- Academic Verification -->
    <meta name="academic-orcid" content="0009-0005-6084-7769">
    <meta name="academic-affiliation" content="University of Huddersfield">

    <!-- Professional Verification -->
    <meta name="dc.creator" content="Veda Salkar">
    <meta name="dc.contributor" content="Veda Salkar">
    <meta name="dc.publisher" content="Veda Salkar">
    <meta name="citation_author" content="Veda Salkar">
    <meta name="citation_author_institution" content="University of Huddersfield">

    <!-- Structured Data -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Veda Salkar",
            "alternateName": ["Veda Salkar", "veda salkar", "Veda Salkar Software Engineer"],
            "url": "<?= htmlspecialchars($SEO['url']); ?>",
            "image": "<?= htmlspecialchars($SEO['image']); ?>",
            "logo": "<?= url('favicon-32x32.png', false); ?>",
            "description": "<?= htmlspecialchars($SEO['description']); ?>",
            "jobTitle": ["Software Engineer", "Full Stack Developer", "Web Developer", "Frontend Developer"],
            "knowsAbout": ["Software Engineering", "Web Development", "Mobile Development", "AI", "Machine Learning", "Full Stack Development", "PHP", "JavaScript", "Python"],
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "West Yorkshire",
                "addressCountry": "United Kingdom"
            },
            "alumniOf": [
                {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Huddersfield",
                    "url": "https://www.hud.ac.uk/",
                    "sameAs": "<?php echo ACADEMIC_PURE; ?>"
                }
            ],
            "affiliation": [
                {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Huddersfield",
                    "url": "https://www.hud.ac.uk/"
                },
                {
                    "@type": "Organization",
                    "name": "CosmoKode Ltd",
                    "url": "https://cosmokode.com/"
                }
            ],
            "worksFor": [
                {
                    "@type": "Organization",
                    "name": "CosmoKode Ltd",
                    "url": "https://cosmokode.com/",
                    "description": "Co-founder"
                }
            ],
            "hasOccupation": {
                "@type": "Occupation",
                "name": "Software Engineer",
                "occupationalCategory": "Computer and Information Technology Occupations",
                "skills": ["Web Development", "Mobile Development", "Full Stack Development", "AI/ML", "Software Engineering"]
            },
            "workLocation": "United Kingdom",
            "nationality": "Indian",
            "identifier": [
                {
                    "@type": "PropertyValue",
                    "name": "ORCID",
                    "value": "0009-0005-6084-7769",
                    "url": "<?php echo ACADEMIC_ORCID; ?>"
                }
            ],
            "sameAs": [
                "<?php echo SOCIAL_LINKEDIN; ?>",
                "<?php echo SOCIAL_GITHUB; ?>",
                "<?php echo SOCIAL_MEDIUM; ?>",
                "<?php echo SOCIAL_INSTAGRAM; ?>",
                "<?php echo SOCIAL_FACEBOOK; ?>",
                "<?php echo SOCIAL_TWITTER; ?>",
                "<?php echo SOCIAL_YOUTUBE; ?>",
                "<?php echo ACADEMIC_PURE; ?>",
                "<?php echo ACADEMIC_ORCID; ?>"
            ]
        }
        </script>

    <!-- Organization Structured Data for CosmoKode -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CosmoKode Ltd",
            "url": "https://cosmokode.com/",
            "logo": "<?= url('favicon-32x32.png', false); ?>",
            "founder": {
                "@type": "Person",
                "name": "Veda Salkar",
                "url": "<?= htmlspecialchars($SEO['url']); ?>"
            },
            "description": "Software development company co-founded by Veda Salkar"
        }
        </script>

    <!-- Academic/Research Profile -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "<?php echo ACADEMIC_ORCID; ?>",
            "name": "Veda Salkar",
            "givenName": "Veda",
            "familyName": "Salkar",
            "alternateName": "Veda Salkar",
            "jobTitle": ["Software Engineer", "Research Officer", "Full Stack Developer", "Frontend Developer"],
            "affiliation": [
                {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Huddersfield",
                    "url": "https://www.hud.ac.uk/",
                    "department": {
                        "@type": "Organization",
                        "name": "School of Computing and Engineering"
                    }
                }
            ],
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of Huddersfield",
                "url": "https://www.hud.ac.uk/"
            },
            "url": "<?= htmlspecialchars($SEO['url']); ?>",
            "sameAs": [
                "<?php echo ACADEMIC_ORCID; ?>"
            ],
            "knowsAbout": [
                "Software Engineering",
                "Computer Science", 
                "Web Development",
                "Frontend Development",
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development"
            ]
        }
        </script>

    <!-- External Resources -->
    <link rel="preload" href="<?= url('assets/css/style.css') ?>" as="style">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"
        media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" /></noscript>
    <link rel="stylesheet" href="<?= url('assets/css/style.css') ?>">
    <link rel="preload" href="<?= url('assets/js/aos/aos.css') ?>" as="style">
    <link rel="stylesheet" href="<?= url('assets/js/aos/aos.css') ?>">
    <script src="<?= url('assets/js/aos/aos.js') ?>" defer></script>

    <!-- Theme initialization script - runs before page renders to prevent flash -->
    <script>
        // Initialize theme before page renders to prevent flash
        (function () {
            const theme = localStorage.getItem('theme');
            const htmlElement = document.documentElement;

            if (theme === 'dark') {
                htmlElement.classList.add('dark');
            } else if (theme === 'light') {
                htmlElement.classList.remove('dark');
            } else {
                // Default to dark theme
                htmlElement.classList.add('dark');
            }
        })();
    </script>
</head>

<body class="bg-gray-100 dark:bg-black-base dark:text-gray-200">

    <!-- Global Page Loader -->
    <div id="page-loader" role="status" aria-label="Loading">
        <img src="<?= url('assets/images/logo@200x200.png', false) ?>"
             alt="Loading..."
             class="w-16 h-16 logo-spin invert dark:invert-0">
        <span class="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">Loading&hellip;</span>
    </div>

    <div id="outer-container" class="relative z-10 mx-auto">

        <?php
        if (isset($HAS_NAV_BAR) && $HAS_NAV_BAR === true) {
            include_once __DIR__ . '/nav.php';
        }
        ?>

        <main>
        <!-- body starts here -->
