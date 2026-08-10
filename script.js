// ==================== LOCK SCREEN & PASSCODE ==================== //
document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.getElementById('lockScreen');
    const mainSite = document.getElementById('mainSite');
    const unlockBtn = document.getElementById('unlockBtn');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const errorMsg = document.getElementById('errorMsg');

    // Correct date of birth (example: 15/05/2003)
    const correctDate = {
        day: '15',
        month: '05',
        year: '2003'
    };

    // Format input to numbers only
    [dayInput, monthInput, yearInput].forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            // Auto-focus to next field
            if (input === dayInput && e.target.value.length === 2) {
                monthInput.focus();
            } else if (input === monthInput && e.target.value.length === 2) {
                yearInput.focus();
            }
        });
    });

    // Unlock function
    unlockBtn.addEventListener('click', () => {
        const enteredDate = {
            day: dayInput.value.padStart(2, '0'),
            month: monthInput.value.padStart(2, '0'),
            year: yearInput.value
        };

        if (enteredDate.day === correctDate.day && 
            enteredDate.month === correctDate.month && 
            enteredDate.year === correctDate.year) {
            
            errorMsg.textContent = '';
            lockScreen.classList.add('hidden');
            mainSite.style.display = 'block';
            triggerInitialAnimations();
        } else {
            errorMsg.textContent = '❌ Wrong date! Try again, love.';
            dayInput.value = '';
            monthInput.value = '';
            yearInput.value = '';
            dayInput.focus();
        }
    });

    // Enter key to unlock
    yearInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });

    function triggerInitialAnimations() {
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Create floating hearts
        createFloatingHearts();
    }
});

// ==================== FLOATING HEARTS ==================== //
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.pointerEvents = 'none';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Animation
        heart.style.animation = `float ${Math.random() * 3 + 3}s ease-in forwards`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }
}

// ==================== SCROLL ANIMATIONS ==================== //
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.message-section, .fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// ==================== FORGIVENESS BUTTON ==================== //
document.getElementById('forgivenessBtn').addEventListener('click', () => {
    const acceptanceModal = document.getElementById('acceptanceModal');
    acceptanceModal.classList.remove('hidden');
    
    // Confetti effect
    showConfetti();
});

// ==================== ACCEPTANCE MODAL BUTTONS ==================== //
document.getElementById('yesBtn').addEventListener('click', () => {
    const acceptanceModal = document.getElementById('acceptanceModal');
    const kissPage = document.getElementById('kissPage');
    
    acceptanceModal.classList.add('hidden');
    kissPage.classList.remove('hidden');
    
    // Celebration effects
    showMassiveConfetti();
    playLoveAnimation();
});

document.getElementById('noBtn').addEventListener('click', () => {
    const acceptanceModal = document.getElementById('acceptanceModal');
    const noBtn = document.getElementById('noBtn');
    
    // Make NO button hard to click (funny effect)
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    
    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Show message
    const subtitle = acceptanceModal.querySelector('.acceptance-subtitle');
    subtitle.textContent = "Don't run away! 😭💔";
    subtitle.style.animation = 'shake 0.5s ease';
});

// ==================== CONFETTI EFFECTS ==================== //
function showConfetti() {
    const confetti = [];
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9996';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 50; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            life: 1,
            color: ['#ff6b9d', '#c44569', '#ffa502', '#ff69b4', '#ff1493'][Math.floor(Math.random() * 5)]
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((particle, index) => {
            particle.y += particle.vy;
            particle.x += particle.vx;
            particle.life -= 0.01;

            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life;
            ctx.fillRect(particle.x, particle.y, 5, 5);

            if (particle.life <= 0) {
                confetti.splice(index, 1);
            }
        });

        if (confetti.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    };

    animate();
}

function showMassiveConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9996';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '🎉', '✨', '🎊'];
    
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 6 + 3,
            life: 1,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            size: Math.random() * 30 + 20,
            rotation: Math.random() * Math.PI * 2
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.vy;
            p.x += p.vx;
            p.vy += 0.2;
            p.rotation += 0.05;
            p.life -= 0.005;

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.font = `${p.size}px Arial`;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillText(p.emoji, 0, 0);
            ctx.restore();

            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    };

    animate();
}

// ==================== LOVE ANIMATION ==================== //
function playLoveAnimation() {
    // Hearts floating animation
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 40 + 30 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100vh';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.style.animation = `float ${Math.random() * 4 + 4}s ease-out forwards`;
            heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// ==================== ROMANTIC MESSAGES ==================== //
function showRomanticAlert() {
    const messages = [
        'You are my everything! 💕',
        'I love you to infinity! ∞❤️',
        'You make my heart skip a beat! 💖',
        'Forever and always, aalishali! 💗',
        'My soul belongs to you! 👑💝'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 40px 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        animation: slideInUp 0.5s ease;
        max-width: 500px;
        width: 90%;
    `;

    alertBox.textContent = randomMessage;
    document.body.appendChild(alertBox);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✓';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: rgba(255, 255, 255, 0.3);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.3s ease;
    `;

    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.5)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    };

    alertBox.appendChild(closeBtn);
    closeBtn.onclick = () => alertBox.remove();

    setTimeout(() => {
        if (alertBox.parentNode) {
            alertBox.remove();
        }
    }, 4000);
}

// Show romantic message every 15 seconds
setInterval(() => {
    if (!document.getElementById('lockScreen').classList.contains('hidden')) {
        showRomanticAlert();
    }
}, 15000);

// ==================== SMOOTH SCROLL ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== RESPONSIVE CHECKS ==================== //
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        document.documentElement.style.fontSize = '14px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
});

// ==================== EASTER EGG ==================== //
let easterEggCount = 0;
document.addEventListener('click', () => {
    easterEggCount++;
    if (easterEggCount === 10) {
        showRomanticAlert();
        easterEggCount = 0;
    }
});

// ==================== PARTICLES ON SCROLL ==================== //
window.addEventListener('scroll', () => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'float 3s ease-out forwards';
        particle.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
        particle.style.zIndex = '5';
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }
});

// ==================== MOBILE OPTIMIZATIONS ==================== //
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.touchAction = 'manipulation';
}