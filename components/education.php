<?php
$education = json_decode(file_get_contents(__DIR__ . '/../data/edu.json'), true) ?? [];

?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <div class="flex items-center justify-between gap-3 mb-4">
        <h1 class="text-neon text-sm font-semibold tracking-wider uppercase">Education</h1>
        <span class="ml-2 text-xs bg-neon/20 text-neon px-2 py-0.5 rounded-full">
            <i class="fa-solid fa-award mr-1"></i>
            <?php echo $education[0]['grade']; ?>
        </span>
    </div>
    <div class="space-y-2">
        <p class="text-white text-lg font-medium">
            <?php echo $education[0]['role']; ?>
        <p class="text-white/60 text-sm"><?php echo $education[0]['org']; ?></p>
    </div>
</div>