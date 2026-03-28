<?php 
$experience = json_decode(file_get_contents(__DIR__ . '/../data/exp.json'), true) ?? [];
?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <h1 class="text-neon text-sm font-semibold tracking-wider mb-6 uppercase">Work Experience</h1>
    
    <div class="relative pl-6 space-y-6 timeline-line">
        <?php foreach($experience as $index => $job): ?>
        <div class="relative">
            <div class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-neon shadow-lg shadow-neon/50"></div>
            
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