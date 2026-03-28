<?php
// ========================================
// DIRECTOR PAGE CONFIGURATION
// ========================================

$director = [
    'name' => 'Veda Salkar',
    'title' => 'Co-founder & Director, Cosmokode Ltd.',
    'image' => 'assets/images/director-profile-image.png',
    'signature' => 'assets/images/signature.png'
];

$aboutMe = "A visionary technology leader dedicated to shaping meaningful digital experiences. With a strong foundation in Computer Science and a Master’s degree from the University of Huddersfield, I bring a blend of strategic thinking and hands‑on innovation to every project I guide.

My journey across diverse environments has strengthened my ability to lead with clarity, empathy, and purpose. I focus on creating solutions that balance technical excellence with human‑centered design, ensuring that every product serves real needs and drives meaningful impact.";

$whatDrivesMe = "I’m passionate about transforming complex challenges into elegant, scalable solutions. Curiosity, collaboration, and continuous learning shape my leadership approach. Whether exploring emerging technologies or guiding teams through ambitious ideas, I’m committed to fostering environments where innovation thrives and people feel empowered to do their best work.";

$socialLinks = [
    ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/vedasalkar/', 'icon' => 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', 'viewBox' => '0 0 24 24'],
    ['type' => 'github', 'url' => 'https://github.com/veda04', 'icon' => 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', 'viewBox' => '0 0 24 24'],
    ['type' => 'medium', 'url' => 'https://salkarveda.medium.com/', 'icon' => 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z', 'viewBox' => '0 0 24 24'],
    ['type' => 'website', 'url' => 'https://salkarveda.com/', 'icon' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', 'viewBox' => '0 0 24 24'],
    ['type' => 'email', 'url' => 'mailto:salkarveda@gmail.com', 'icon' => 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z']
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $director['name']; ?> - <?php echo $director['title']; ?></title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Veda Salkar - Co-founder & Director at Cosmokode Ltd. Visionary technology leader with expertise in software development, strategic leadership, and innovative digital solutions. Master's in Computing from University of Huddersfield.">
    <meta name="keywords" content="Veda Salkar, Co-founder, Director, Cosmokode, Technology Leader, Software Development, Strategic Leadership, Computer Science, Huddersfield">
    <meta name="author" content="Veda Salkar">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://salkarveda.com/director.php">
    
    <!-- Open Graph Tags -->
    <meta property="og:type" content="profile">
    <meta property="og:title" content="Veda Salkar - Co-founder & Director, Cosmokode Ltd">
    <meta property="og:description" content="A visionary technology leader dedicated to shaping meaningful digital experiences. Combining strategic thinking with hands-on innovation to create solutions that transform businesses.">
    <meta property="og:url" content="https://salkarveda.com/director.php">
    <meta property="og:image" content="https://salkarveda.com/assets/images/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Veda Salkar - Director">
    <meta property="profile:first_name" content="Veda">
    <meta property="profile:last_name" content="Salkar">
    <meta property="profile:username" content="vedasalkar">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Veda Salkar - Co-founder & Director, Cosmokode Ltd">
    <meta name="twitter:description" content="A visionary technology leader dedicated to shaping meaningful digital experiences. Combining strategic thinking with hands-on innovation.">
    <meta name="twitter:image" content="https://salkarveda.com/assets/images/og-image.png">
    <meta name="twitter:creator" content="@vedasalkar">
    
    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#7CFF4A">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        neon: '#7CFF4A',
                        'neon-dark': '#5CD425',
                        charcoal: '#1a1a1a',
                        'charcoal-light': '#2a2a2a'
                    },
                    fontFamily: {
                        display: ['Playfair Display', 'serif'],
                        body: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <style>
        @font-face {
            font-family: 'Reinata';
            src: url('assets/fonts/ReinataDemo-9gq2.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
        }
        
        body {
            background: #000;
            font-family: 'Inter', sans-serif;
            position: relative;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(124, 255, 74, 0.05) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }
        
        .container {
            position: relative;
            z-index: 1;
        }
        
        .hero-name {
            font-family: 'Playfair Display', serif;
            letter-spacing: 0.02em;
            font-weight: 700;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .director-image {
            filter: grayscale(20%) contrast(1.1);
            transition: all 0.3s ease;
        }
        
        .director-image:hover {
            filter: grayscale(0%) contrast(1.05);
        }
        
        .section-title {
            position: relative;
            display: inline-block;
            padding-bottom: 12px;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 2px;
            background: #7CFF4A;
        }
        
        .social-icon {
            transition: all 0.3s ease;
        }
        
        .social-icon:hover {
            transform: translateY(-3px);
            filter: brightness(1.2);
        }
        
        .signature {
            font-family: 'Reinata', cursive;
            font-size: 3rem;
            color: #7CFF4A;
            line-height: 1;
        }
    </style>
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Veda Salkar",
        "url": "https://salkarveda.com",
        "image": "https://salkarveda.com/assets/images/og-image.png",
        "jobTitle": "Co-founder & Director",
        "worksFor": {
            "@type": "Organization",
            "name": "Cosmokode Ltd",
            "url": "https://cosmokode.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Huddersfield",
            "addressCountry": "United Kingdom"
        },
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of Huddersfield",
            "location": "Huddersfield, United Kingdom"
        },
        "email": "salkarveda@gmail.com",
        "sameAs": [
            "https://www.linkedin.com/in/vedasalkar/",
            "https://github.com/veda04",
            "https://salkarveda.medium.com/",
            "https://www.instagram.com/veda_04/",
            "https://salkarveda.com/"
        ],
        "knowsAbout": [
            "Strategic Leadership",
            "Technology Management",
            "Software Development",
            "Digital Innovation",
            "Computer Science",
            "Team Leadership"
        ],
        "description": "A visionary technology leader dedicated to shaping meaningful digital experiences. With a strong foundation in Computer Science and a Master's degree from the University of Huddersfield, I bring a blend of strategic thinking and hands-on innovation to every project."
    }
    </script>
</head>
<body class="min-h-screen text-white font-body antialiased">
    
    <div class="container mx-auto px-6 py-12 lg:py-20 max-w-7xl">
        
        <!-- Header -->
        <div class="text-center mb-16 fade-in">
            <h1 class="hero-name text-5xl sm:text-6xl lg:text-7xl text-white mb-4 uppercase">
                <?php echo $director['name']; ?>
            </h1>
            <p class="text-white/60 text-lg tracking-wide">
                <?php echo $director['title']; ?>
            </p>
        </div>
        
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            
            <!-- Left Column - Content -->
            <div class="space-y-12 fade-in order-2 lg:order-1">
                
                <!-- About Me Section -->
                <div>
                    <h2 class="section-title text-3xl text-white mb-8">About Me</h2>
                    <div class="space-y-4">
                        <?php 
                        $paragraphs = explode("\n\n", $aboutMe);
                        foreach($paragraphs as $paragraph): 
                        ?>
                        <p class="text-white/70 text-base leading-relaxed">
                            <?php echo $paragraph; ?>
                        </p>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <!-- What Drives Me Section -->
                <div>
                    <h2 class="section-title text-3xl text-white mb-8">What Drives Me</h2>
                    <p class="text-white/70 text-base leading-relaxed">
                        <?php echo $whatDrivesMe; ?>
                    </p>
                </div>
                
            </div>
            
            <!-- Right Column - Image -->
            <div class="fade-in flex justify-center lg:justify-end order-1 lg:order-2">
                <div class="relative w-full max-w-md lg:max-w-lg h-[600px]">
                    <div class="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent rounded-3xl blur-xl"></div>
                    <img src="<?php echo $director['image']; ?>" 
                         alt="<?php echo $director['name']; ?>"
                         class="relative director-image w-full h-full rounded-3xl shadow-2xl border border-white/10 object-cover object-top">
                </div>
            </div>
            
        </div>
        
        <!-- Footer Section -->
        <div class="border-t border-white/10 pt-12 fade-in">
            <div class="flex flex-col md:flex-row justify-between items-center gap-8">
                
                <!-- Signature -->
                <div class="text-left">
                    <p class="text-white/40 text-sm mb-2">Sincerely,</p>
                    <div class="mb-2">
                        <p class="signature"><?php echo $director['name']; ?></p>
                    </div>
                    <p class="text-white/60 text-sm pb-1"><?php echo $director['name']; ?></p>
                    <p class="text-white/40 text-xs"><?php echo $director['title']; ?></p>
                </div>
                
                <!-- Social Links -->
                <div>
                    <p class="text-white/40 text-sm mb-4 text-center md:text-right">Connect with me</p>
                    <div class="flex items-center gap-4">
                        <?php foreach($socialLinks as $social): ?>
                        <a href="<?php echo $social['url']; ?>" 
                           target="_blank"
                           class="social-icon w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon/10 hover:border-neon/30">
                            <svg class="w-5 h-5 text-white/70" 
                                 fill="<?php echo isset($social['viewBox']) ? 'currentColor' : 'none'; ?>" 
                                 stroke="<?php echo isset($social['viewBox']) ? 'none' : 'currentColor'; ?>" 
                                 viewBox="<?php echo isset($social['viewBox']) ? $social['viewBox'] : '0 0 24 24'; ?>">
                                <path <?php echo isset($social['viewBox']) ? '' : 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2"'; ?> 
                                      d="<?php echo $social['icon']; ?>"></path>
                            </svg>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <!-- JavaScript -->
    <script>
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.addEventListener('DOMContentLoaded', () => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
        });
    </script>
    
</body>
</html>
