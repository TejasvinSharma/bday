const revealBtn = document.getElementById("revealBtn");
const message = document.getElementById("message");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resize();
window.addEventListener("resize", resize);

revealBtn.addEventListener("click", () => {
  message.classList.add("visible");
  message.scrollIntoView({ behavior: "smooth", block: "center" });
  launchConfetti();
  revealBtn.innerHTML = "<span>Make a wish</span><span class='arrow'>✦</span>";
});

let pieces = [];
let animationRunning = false;

function launchConfetti() {
  const count = 150;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: window.innerWidth / 2 + (Math.random() - .5) * 180,
      y: window.innerHeight * .42,
      vx: (Math.random() - .5) * 13,
      vy: -Math.random() * 12 - 4,
      size: Math.random() * 7 + 3,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - .5) * .25,
      gravity: .24,
      life: 1,
      shape: Math.random() > .45 ? "rect" : "circle"
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    animate();
  }
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  pieces.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= .992;
    p.rotation += p.rotationSpeed;
    p.life -= .006;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, p.life);

    const colors = ["#9a5d5d", "#b78668", "#6e7772", "#c8a77d", "#2f302d"];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.8);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });

  pieces = pieces.filter(p => p.life > 0 && p.y < window.innerHeight + 40);

  if (pieces.length) {
    requestAnimationFrame(animate);
  } else {
    animationRunning = false;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
