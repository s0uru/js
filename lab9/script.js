
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const numBallsInput = document.getElementById("numBalls");
const distanceInput = document.getElementById("distance");

let balls = [];
let animationId;

function createBalls(count) {
  balls = [];
  for (let i = 0; i < count; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 5
    });
  }
}

function updateBalls() {
  for (let ball of balls) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
    if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;
  }
}

function drawBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maxDist = parseFloat(distanceInput.value) * canvas.width;

  for (let i = 0; i < balls.length; i++) {
    const b1 = balls[i];

    // draw lines
    for (let j = i + 1; j < balls.length; j++) {
      const b2 = balls[j];
      const dx = b1.x - b2.x;
      const dy = b1.y - b2.y;
      const dist = Math.hypot(dx, dy);

      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(b1.x, b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.stroke();
      }
    }

    // draw ball
    ctx.beginPath();
    ctx.arc(b1.x, b1.y, b1.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

function animate() {
  updateBalls();
  drawBalls();
  animationId = requestAnimationFrame(animate);
}

startBtn.onclick = () => {
  cancelAnimationFrame(animationId);
  const count = parseInt(numBallsInput.value);
  createBalls(count);
  animate();
};

resetBtn.onclick = () => {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls = [];
};
