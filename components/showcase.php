<?php
$clients = [
    'assets/images/organizations/cosmokode-between-transparent.png',
    'assets/images/organizations/hud-uni.jpeg',
    'assets/images/organizations/trellissoft.jpeg',
    'assets/images/organizations/teaminertia.jpeg',
    'assets/images/organizations/sparkplustech.jpeg',  
    'assets/images/organizations/digisol.jpeg',
    'assets/images/organizations/innovians.jpeg',
    'assets/images/organizations/veevees.png',
    'assets/images/organizations/ramjaninteriors.png',
    'assets/images/organizations/mms-white-transparent.png',
    'assets/images/organizations/psm.png',
    'assets/images/organizations/fitplanex.png',
];
?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <h1 class="text-neon text-sm font-semibold tracking-wider mb-6 uppercase">Showcase</h1>
    
    <div class="grid grid-cols-4 gap-4">
        <?php foreach($clients as $client): ?>
        <div class="bg-white/5 rounded-lg px-0 py-1 flex items-center justify-center h-16 border border-white/5 hover:border-neon/30 transition-colors">
            <img src="<?php echo $client; ?>" alt="Client logo" class="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity">
        </div>
        <?php endforeach; ?>
    </div>
</div>