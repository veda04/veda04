<?php 
$experience = json_decode(file_get_contents(__DIR__ . '/../data/exp.json'), true) ?? [];
?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-neon text-sm font-semibold tracking-wider uppercase">Work Experience</h1>
        <!-- <a href="blog" 
            class="text-neon hover:text-neon-dark text-xs font-medium inline-flex items-center gap-1 group transition-colors">
            View All
            <svg class="w-3 h-3 mt-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </a> -->
    </div>
    
    <div class="relative pl-6 space-y-6 timeline-line">
        <?php foreach($experience as $index => $job): ?>
        <div class="relative">
            <div class="absolute -left-7 top-1 w-2 h-2 rounded-full bg-neon shadow-lg shadow-neon/50"></div>
            
            <div  class="pl-4 -ml-1">
                <h4 class="text-white font-semibold text-base mb-1">
                    <?php echo $job['role']; ?>
                </h4>
                <p class="text-white/80 text-sm mb-1"><?php echo $job['org']; ?></p>
                <div class="flex items-center gap-3 text-white/50 text-xs">
                    <span><?php echo $job['period']; ?></span>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>