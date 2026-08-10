// ==================== PASSCODE VALIDATION ====================
const correctDate = {
    day: '06',
    month: '02',
    year: '2008'
};

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('errorMsg');
const lockScreen = document.getElementById('lockScreen');
const mainSite = document.getElementById('mainSite');
const forgivenessBtn = document.getElementById('forgivenessBtn');

// Auto-focus to next input
dayInput.addEventListener('input', (e) => {
    if (e.target.value.length === 2) monthInput.focus();
});

monthInput.addEventListener('input', (e) => {
    if (e.target.value.length === 2) yearInput.focus();
});

// Unlock button click
unlockBtn.addEventListener('click', validateAndUnlock);

// Enter key support
yearInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') validateAndUnlock();
});

function validateAndUnlock() {
    const day = dayInput.value.padStart(2, '0');
    const month = monthInput.value.padStart(2, '0');
    const year = yearInput.value;

    if (!day || !month || !year) {
        showError('Please enter all fields');
        return;
    }

    if (day === correctDate.day && month === correctDate.month && year === correctDate.year) {
        errorMsg.textContent = '';
        unlockSite();
    } else {
        showError('❌ Incorrect date. Try again! 💔');
        dayInput.value = '';
        monthInput.value = '';
        yearInput.value = '';
        dayInput.focus();
    }
}

function showError(message) {
    errorMsg.textContent = message;
    lockScreen.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        lockScreen.style.animation = '';
    }, 500);
}

function unlockSite() {
    lockScreen.classList.add('hidden');
    setTimeout(() => {
        lockScreen.style.display = 'none';
    }, 800);
}

// ==================== FLOATING HEARTS GENERATION ====================
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heartsContainer.appendChild(heart);
    }
}

createFloatingHearts();

// ==================== PARTICLE EFFECT ON BUTTON CLICK ====================
forgivenessBtn.addEventListener('click', function() {
    createParticles(this);
    showConfetti();
    
    // Show romantic message
    setTimeout(() => {
        showRomanticAlert();
    }, 300);
});

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = '20px';
        particle.style.zIndex = '9000';
        particle.textContent = '❤️';

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;
        let life = 100;

        document.body.appendChild(particle);

        const animate = () => {
            posX += vx;
            posY += vy;
            vy += 0.1; // gravity
            life -= 2;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = life / 100;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

function showConfetti() {
    const confettiPieces = 50;
    
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff6b9d', '#ffa502', '#c44569', '#667eea'][Math.floor(Math.random() * 4)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '8000';
        confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function showRomanticAlert() {
    const messages = [
        "You mean the world to me! 💕",
        "I love you more than words can say! 💖",
        "You are my everything! ❤️",
        "Thank you for being my aalishali! 💕",
        "I promise to love you forever! 💕"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
    alertBox.style.color = 'white';
    alertBox.style.padding = '40px';
    alertBox.style.borderRadius = '20px';
    alertBox.style.fontSize = '24px';
    alertBox.style.textAlign = 'center';
    alertBox.style.zIndex = '10000';
    alertBox.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    alertBox.style.animation = 'scaleIn 0.5s ease';
    alertBox.textContent = randomMessage;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✓';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.width = '40px';
    closeBtn.style.height = '40px';
    closeBtn.onclick = () => alertBox.remove();

    alertBox.appendChild(closeBtn);
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.remove(), 5000);
}

// Add scaleIn animation
const style2 = document.createElement('style');
style2.textContent = `
    @keyframes scaleIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style2);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Fade in animations are handled by CSS
    console.log('🎀 Welcome to aalishali\'s special message! 💕');
});