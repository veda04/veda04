<?php
$clients = json_decode(file_get_contents(__DIR__ . '/../data/showcase.json'), true) ?? [];
?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <h1 class="text-neon text-sm font-semibold tracking-wider mb-6 uppercase">Showcase</h1>
    
    <div class="grid grid-cols-4 gap-4">
        <?php foreach($clients as $client): ?>
        <a href="<?php echo $client['link']; ?>" target="_blank" title="<?php echo $client['title']; ?>" class="bg-white/5 rounded-lg px-0 py-1 flex items-center justify-center h-16 border border-white/5 hover:border-neon/30 transition-colors">
            <img src="<?php echo $client['img']; ?>" alt="<?php echo $client['title']; ?> logo" class="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity">
        </a>
        <?php endforeach; ?>
    </div>
</div>