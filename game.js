let score = 0;
let totalToshi = 0;
let isJumping = false;
let isGameRunning = false;

const player = document.getElementById('player');
const platform = document.getElementById('platform');
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const toshiDisplay = document.getElementById('toshi');
const startButton = document.getElementById('startButton');

function startGame() {
    isGameRunning = true;
    score = 0;
    updateScore();
    startButton.style.display = 'none';
    player.style.bottom = '0px';  // reset player position
    player.style.left = '50px';
    document.addEventListener('keydown', jump);
    gameLoop();
}

function gameLoop() {
    if (!isGameRunning) return;

    if (detectCollision(player, coin)) {
        score += 10;
        updateScore();
        resetCoin();
    }

    requestAnimationFrame(gameLoop);
}

function jump(e) {
    if (e.keyCode === 32 && !isJumping) { // Spacebar key
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight > 100) {  // max jump height
                clearInterval(jumpInterval);
                fall();
            } else {
                player.style.bottom = `${parseInt(player.style.bottom) + 5}px`;
                jumpHeight += 5;
            }
        }, 20);
    }
}

function fall() {
    const fallInterval = setInterval(() => {
        if (parseInt(player.style.bottom) <= 0) {
            clearInterval(fallInterval);
            player.style.bottom = '0px';
            isJumping = false;
        } else {
            player.style.bottom = `${parseInt(player.style.bottom) - 5}px`;
        }
    }, 20);
}

function detectCollision(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function resetCoin() {
    coin.style.left = `${Math.random() * 750}px`;
    coin.style.bottom = `${Math.random() * 200 + 100}px`;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
    totalToshi += Math.floor(score / 10); // Conversione 1 punto = 1 TOSHI
    toshiDisplay.textContent = `TOSHI: ${totalToshi}`;
}

function endGame() {
    isGameRunning = false;
    document.removeEventListener('keydown', jump);
    startButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);
