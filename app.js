const farmingButton = document.getElementById('farmingButton');
const timerElement = document.getElementById('timer');
const rewardElement = document.getElementById('reward');
const claimButton = document.getElementById('claimButton');

let farmingStartTime = null;
const FARMING_DURATION = 8 * 60 * 60 * 1000; // 8 ore in millisecondi

farmingButton.addEventListener('click', startFarming);
claimButton.addEventListener('click', claimReward);

function startFarming() {
    farmingStartTime = Date.now();
    farmingButton.disabled = true;
    farmingButton.textContent = 'FARMING IN PROGRESS...';
    timerElement.classList.remove('hidden');
    updateTimer();
}

function updateTimer() {
    const now = Date.now();
    const elapsedTime = now - farmingStartTime;
    const remainingTime = FARMING_DURATION - elapsedTime;

    if (remainingTime <= 0) {
        showClaimButton();
    } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setTimeout(updateTimer, 1000);
    }
}

function showClaimButton() {
    timerElement.classList.add('hidden');
    rewardElement.classList.remove('hidden');
    farmingButton.textContent = 'START FARMING';
    farmingButton.disabled = false;
}

function claimReward() {
    alert('Hai riscosso 50 TOSHI!');
    rewardElement.classList.add('hidden');
}
