const skillBars = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = (entry.target as HTMLElement).style.width;
        (entry.target as HTMLElement).style.width = "0";
        setTimeout(() => {
          (entry.target as HTMLElement).style.width = width;
        }, 100);
      }
    });
  },
  { threshold: 0.5 }
);
skillBars.forEach((bar) => {
  observer.observe(bar);
});
// ===============================
// 🌐 Défilement fluide avec offset (navbar fixe)
// ===============================

document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar.offsetHeight; // hauteur dynamique
    const offsetTop = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// ===============================
// ✨ Fond animé futuriste avec particules bleues
// ===============================

// Création du canvas pour les particules
const canvas = document.createElement("canvas");
canvas.id = "particle-bg";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
let particlesArray = [];
let mouse = { x: null, y: null };
let numberOfParticles = 120;

// Ajustement du canvas à la taille de l'écran
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
initCanvas();
window.addEventListener("resize", initCanvas);

// Classe Particule
class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // rebonds sur les bords
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(0, 191, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Initialisation des particules
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1.2;
    const speedY = (Math.random() - 0.5) * 1.2;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}
initParticles();

// Animation
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Connexions entre particules proches
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = "rgba(0, 191, 255, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
