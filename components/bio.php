<?php 
$stats = [
    ['value' => date('Y') - 2019 . '+', 'label' => 'Years'],
    ['value' => 'Full-stack', 'label' => 'expertise'],
    ['value' => '100%', 'label' => 'Happy Clients'],
];
?>

<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover fade-in">
    <h1 class="text-neon text-sm font-semibold tracking-wider mb-4 uppercase">About me</h1>
    
    <div class="space-y-3 mb-6">
        <?php foreach($stats as $stat): ?>
        <div class="flex items-baseline gap-2">
            <span class="text-neon text-3xl font-bold"><?php echo $stat['value']; ?></span>
            <span class="text-white/80 text-lg"><?php echo $stat['label']; ?></span>
        </div>
        <?php endforeach; ?>
    </div>
    
    <p class="text-white/70 text-sm leading-relaxed">
        Here's what makes me different, I genuinely care whether what I build works for you. Not just writing flawless code, 
        but interfaces that are intuitive, smooth, and a joy to interact with. Don't see a skill in my stack? I'll learn it, own it, 
        and deliver it. A happy client isn't just the goal, it's the standard. Creativity, curiosity, and a zero-complaints delivery policy? 
        That's kind of my whole thing. Let's work together and build something great.
    </p>
</div>