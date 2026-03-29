<?php 
$latestBlogs = cmsoneArticleList(null, null, 1, 1);

if ($latestBlogs && count($latestBlogs) > 0):
    foreach ($latestBlogs as $latestBlog): 
?>
<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-neon text-sm font-semibold tracking-wider uppercase">Latest Article</h1>
        <a href="blog" 
           class="text-neon hover:text-neon-dark text-xs font-medium inline-flex items-center gap-1 group transition-colors">
            View All
            <svg class="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </a>
    </div>
    
    <div class="space-y-4">
        <div class="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/5">
            <img src="<?php echo htmlspecialchars($latestBlog['featuredImage']); ?>" 
                 alt="<?php echo htmlspecialchars($latestBlog['title']); ?>" 
                 class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
        </div>
        
        <div>
            <div class="flex items-center gap-2 mb-3">
                <span class="text-white/40 text-xs">•</span>
                <span class="text-white/40 text-xs"><?php echo format_date_display($latestBlog['publishedAt']); ?></span>
            </div>
            
            <h3 class="text-white font-semibold text-base mb-2 leading-snug">
                <?php echo htmlspecialchars($latestBlog['title']); ?>
            </h3>
            
            <p class="text-white/60 text-sm leading-relaxed mb-4">
                <?php echo htmlspecialchars($latestBlog['excerpt']); ?>
            </p>
            
            <div class="flex items-center justify-between">
                <a href="<?= url('blogs/'.$latestBlog['slug'], false) ?>" 
                   class="text-neon hover:text-neon-dark text-sm font-medium inline-flex items-center gap-2 group">
                    Read More
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
<?php 
endforeach;
endif;
?>