// Teasing quotes for the NO button
const quotes = [
    "Ayyo 😆 not that easy",
    "Why are you running da 😌",
    "Your heart already chose YES 💚",
    "Come on… I know you’re smiling now 😍",
    "Wait, let me think... NO 😜",
    "You can't catch me! 🏃‍♀️",
    "Error 404: NO button not found 🚫",
    "I dare you to click it! 😈",
    "Oops! Missed it again 🥂",
    "Tamileyy, stop playing! 💚"
];

// Elements
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const teaseQuote = document.getElementById('tease-quote');
const phase1 = document.getElementById('phase-1');
const phase2 = document.getElementById('phase-2');
const phase3 = document.getElementById('phase-3');
const surpriseCard = document.getElementById('surprise-card');
const tapLoveBtn = document.getElementById('tap-love-btn');

// --- PHASE 1: NO BUTTON LOGIC ---

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

function moveButton() {
    // Random position
    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';

    // Change quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    teaseQuote.innerText = randomQuote;
    teaseQuote.style.opacity = '0';
    setTimeout(() => {
        teaseQuote.style.opacity = '1';
    }, 10);
}

// --- TRANSITION TO PHASE 2 ---

yesBtn.addEventListener('click', () => {
    phase1.classList.remove('active');
    phase1.classList.add('hidden');

    // Smooth transition delay
    setTimeout(() => {
        phase2.classList.remove('hidden');
        phase2.classList.add('active');
        window.scrollTo(0, 0);
    }, 500);

    // Start continuous heart crackle (green + white) across all pages
    startContinuousHeartCrackle();
});

// --- CONTINUOUS HEART CRACKLE (green + white hearts every 2 seconds) ---
let heartCrackleInterval = null;

function startContinuousHeartCrackle() {
    if (heartCrackleInterval) return; // Already running
    heartCrackleInterval = setInterval(() => {
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createMiniHeartBurst(x, y);
    }, 1000);
}

function createMiniHeartBurst(x, y) {
    const hearts = ['💚', '🤍', '💚', '🤍', '💚'];
    const count = 8;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'burst-heart';

        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 120;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 80;

        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = (24 + Math.random() * 16) + 'px';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1200);
    }
}

// --- PHASE 2: SURPRISE CARD LOGIC ---

function openLayer(layerNum) {
    if (layerNum === 1) {
        document.getElementById('layer-1').style.transform = 'translateY(-100%)';
        setTimeout(() => {
            document.getElementById('layer-1').classList.remove('active');
            document.getElementById('layer-2').classList.add('active');
        }, 500);
    } else if (layerNum === 2) {
        document.getElementById('layer-2').style.transform = 'translateY(-100%)';
        setTimeout(() => {
            document.getElementById('layer-2').classList.remove('active');
            document.getElementById('layer-3').classList.add('open');
        }, 500);
    }
}

// --- TRANSITION TO PHASE 3 ---

function proceedToPhase3() {
    phase2.classList.remove('active');
    phase2.classList.add('hidden');

    setTimeout(() => {
        phase3.classList.remove('hidden');
        phase3.classList.add('active');
    }, 500);
}

// --- PHASE 3: TAP LOVE ---

let cosmicRevealed = false;

tapLoveBtn.addEventListener('click', (e) => {
    createHeartBurst(e.clientX, e.clientY);

    // Add multiple random bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeartBurst(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 200);
    }

    // After hearts burst — reveal the cosmic universe section
    if (!cosmicRevealed) {
        cosmicRevealed = true;
        tapLoveBtn.innerHTML = '💚 You tapped love! 💚';
        tapLoveBtn.style.background = 'var(--primary-color)';
        tapLoveBtn.style.color = '#000';
        tapLoveBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            showCosmicReveal();
        }, 1500);
    }
});

// --- COSMIC OVERLAY - Message Card Carousel ---

let currentCard = 0;
const totalCards = 10;
let isAnimating = false;

function showCosmicReveal() {
    const cosmicReveal = document.getElementById('cosmic-reveal');
    cosmicReveal.classList.remove('hidden');
    cosmicReveal.classList.add('visible');

    // Generate twinkling stars
    generateStars();

    // Generate dot indicators
    generateDots();

    // Update counter
    updateCounter();

    // Update nav button states
    updateNavButtons();

    // Start shooting stars
    startShootingStars();
}

// Navigate between cards (rotate sweep: enter left, exit right)
function navigateCard(direction) {
    if (isAnimating) return;

    const nextIndex = currentCard + direction;
    if (nextIndex < 0 || nextIndex >= totalCards) return;

    isAnimating = true;

    const currentEl = document.querySelector(`.msg-card[data-card="${currentCard}"]`);
    const nextEl = document.querySelector(`.msg-card[data-card="${nextIndex}"]`);

    // Forward: current exits RIGHT, next enters from LEFT
    // Backward: current exits LEFT, next enters from RIGHT
    currentEl.classList.remove('active', 'enter-from-right');
    currentEl.classList.add(direction > 0 ? 'exit-right' : 'exit-left');

    setTimeout(() => {
        currentEl.classList.remove('exit-left', 'exit-right');

        currentCard = nextIndex;
        if (direction > 0) {
            // Going forward: next card sweeps in from left
            nextEl.classList.add('active');
        } else {
            // Going back: next card sweeps in from right
            nextEl.classList.add('enter-from-right');
        }

        updateDots();
        updateCounter();
        updateNavButtons();

        isAnimating = false;
    }, 700);
}

// Go to specific card (from dot click)
function goToCard(index) {
    if (isAnimating || index === currentCard) return;
    const direction = index > currentCard ? 1 : -1;

    isAnimating = true;

    const currentEl = document.querySelector(`.msg-card[data-card="${currentCard}"]`);
    const nextEl = document.querySelector(`.msg-card[data-card="${index}"]`);

    currentEl.classList.remove('active', 'enter-from-right');
    currentEl.classList.add(direction > 0 ? 'exit-right' : 'exit-left');

    setTimeout(() => {
        currentEl.classList.remove('exit-left', 'exit-right');
        currentCard = index;
        if (direction > 0) {
            nextEl.classList.add('active');
        } else {
            nextEl.classList.add('enter-from-right');
        }
        updateDots();
        updateCounter();
        updateNavButtons();
        isAnimating = false;
    }, 700);
}

// Generate dots
function generateDots() {
    const dotsContainer = document.getElementById('msg-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'msg-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToCard(i);
        dotsContainer.appendChild(dot);
    }
}

// Update active dot
function updateDots() {
    const dots = document.querySelectorAll('.msg-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCard);
    });
}

// Update counter display
function updateCounter() {
    document.getElementById('msg-current').textContent = currentCard + 1;
}

// Update navigation button states
function updateNavButtons() {
    document.getElementById('msg-prev').disabled = currentCard === 0;
    document.getElementById('msg-next').disabled = currentCard === totalCards - 1;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!cosmicRevealed) return;
    const overlay = document.getElementById('cosmic-reveal');
    if (overlay.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigateCard(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigateCard(-1);
    }
});

// Generate twinkling stars
function generateStars() {
    const container = document.getElementById('stars-container');
    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (2 + Math.random() * 3) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';

        // Some stars with green tint
        if (Math.random() > 0.7) {
            star.style.background = 'rgba(0, 255, 65, 0.8)';
        }

        container.appendChild(star);
    }
}

// Shooting stars flying across
function startShootingStars() {
    const container = document.getElementById('stars-container');

    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = Math.random() * 60 + '%';
        shootingStar.style.top = Math.random() * 40 + '%';

        container.appendChild(shootingStar);

        setTimeout(() => {
            shootingStar.remove();
        }, 1500);
    }, 3000);
}

function createHeartBurst(x, y) {
    const heartCount = 15;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💚';
        heart.className = 'burst-heart';

        // Random trajectory
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 100; // Float upwards

        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

// Add some subtle background hearts
function addBgHearts() {
    const container = document.getElementById('heart-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💚';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.opacity = Math.random() * 0.5;
        heart.style.fontSize = (10 + Math.random() * 20) + 'px';
        heart.style.transition = 'all 5s linear';
        heart.style.pointerEvents = 'none';

        container.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 1000);
}

addBgHearts();

