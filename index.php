
<?php include __DIR__ . '/partials/header.php'; ?>

<div class="portfolio-body min-h-screen text-white font-body antialiased" style="background: url('assets/images/profile-image.png') #000 center center / contain no-repeat fixed;">
    
    <div class="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        
        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            <!-- ============================================ -->
            <!-- LEFT COLUMN - Name Header + Bio + Showcase + Blog + Social -->
            <!-- ============================================ -->
            <div class="lg:col-span-4 space-y-6">
                
                <?php include __DIR__ . '/components/hero.php'; ?>
                
                <?php include __DIR__ . '/components/bio.php'; ?>
                
                <?php include __DIR__ . '/components/showcase.php'; ?>
                
                <?php include __DIR__ . '/components/blog.php'; ?>
                
                <?php include __DIR__ . '/components/social.php'; ?>

                <div class="fade-in">
                    <a href="<?php echo url('assets/vs-resume.pdf', false); ?>" 
                       download="Veda_Salkar_Resume.pdf"
                       class="w-full bg-neon hover:bg-neon-dark text-charcoal font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-neon/30">
                        <svg class="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Download Resume
                    </a>
                </div>
                
            </div>
            
            <!-- ============================================ -->
            <!-- CENTER COLUMN - Portrait -->
            <!-- ============================================ -->
            <div class="lg:col-span-4 relative fade-in">
                <div class="relative">
                
                    <div class="relative z-10 overflow-hidden">
                    </div>
                    
                    <svg class="scribble-arrow absolute -right-8 top-1/3 hidden lg:block" viewBox="0 0 120 80">
                        <path d="M10,40 Q30,20 50,35 T90,45 L85,40 M90,45 L85,50" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"
                              class="animate-pulse"/>
                    </svg>
                    
                </div>
            </div>
            
            <!-- ============================================ -->
            <!-- RIGHT COLUMN - Education, Skills & Work Experience -->
            <!-- ============================================ -->
            <div class="lg:col-span-4 space-y-6">
                <?php include __DIR__ . '/components/education.php'; ?>

                <?php include __DIR__ . '/components/skills.php'; ?>
                
                <?php include __DIR__ . '/components/experience.php'; ?>
                
                <?php include __DIR__ . '/components/projects.php'; ?>   
            </div>
            
        </div>
        <?php include __DIR__ . '/partials/copyrights.php'; ?>
    </div>
</div>
<?php include __DIR__ . '/partials/footer.php'; ?>