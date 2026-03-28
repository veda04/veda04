<?php
$skills = json_decode(file_get_contents(__DIR__ . '/../data/skills.json'), true) ?? [];
?>

<div class="relative flex items-center justify-center fade-in">
    <div class="hidden lg:block absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <svg class="w-80 h-80 text-ring" viewBox="0 0 200 200" style="animation: rotate 20s linear infinite reverse;">
            <defs>
                <path id="circle" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"></path>
            </defs>
            <text font-size="7" fill="rgba(255, 255, 255, 0.3)" letter-spacing="3" style="text-transform: uppercase;">
                <textPath href="#circle">
                    Software Engineer • Research Officer • Full-Stack Developer • Lifelong Learner •    
                </textPath>
            </text>
        </svg>
    </div>
    <div class="w-full lg:w-72 ml-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover relative z-50">
        <h1 class="text-neon text-sm font-semibold tracking-wider mb-4 uppercase text-left">Skills</h1>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-left">

            <?php foreach($skills as $skill): ?>
            <div class="text-white/50 text-xs hover:text-neon transition-colors flex items-center gap-2">
                <span class="text-neon">•</span>
                <?php echo $skill['title']; ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>