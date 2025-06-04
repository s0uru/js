let counter = 0;
let lastTime = Date.now();
let ball = { x: 200, y: 200, radius: 10 }; // Pozycja i rozmiar kulki
let hole = { x: 300, y: 300, radius: 15 }; // Pozycja i rozmiar dziury
let velocity = { x: 0, y: 0 }; // Prędkość kulki
let score = 0;
let startTime = Date.now();

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
canvas.style.border = '3px solid black';
canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
canvas.style.margin= "230px 700px";


window.addEventListener('deviceorientation', onDeviceMove);

function onDeviceMove(event) {
    const { beta, gamma } = event; // beta: pochylenie przód-tył, gamma: pochylenie lewo-prawo
    velocity.x = gamma / 10; // Skalowanie prędkości
    velocity.y = beta / 10;
}

function updateBallPosition() {
    ball.x += velocity.x;
    ball.y += velocity.y;

    // Ograniczenie ruchu kulki do obszaru canvas
    if (ball.x - ball.radius < 0) ball.x = ball.radius;
    if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;
    if (ball.y - ball.radius < 0) ball.y = ball.radius;
    if (ball.y + ball.radius > canvas.height) ball.y = canvas.height - ball.radius;
}

function checkCollision() {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + hole.radius) {
        score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
    ball.y = Math.random() * (canvas.height - 2 * ball.radius) + ball.radius;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie dziury
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Rysowanie kulki
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    // Wyświetlanie wyniku
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Wyświetlanie czasu
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    ctx.fillText(`Time: ${elapsedTime}s`, 10, 40);
}

function animate() {
    counter++;
    if (counter % 100 === 0) {
        const time = Date.now();
        const interval = time - lastTime;
        console.log(`Render 100 klatek trwał: ${interval} [${1000 / (interval / 100)}fps]`);
        lastTime = time;
    }

    updateBallPosition();
    checkCollision();
    draw();

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);