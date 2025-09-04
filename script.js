document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const game = document.getElementById('game');
    const dog = document.getElementById('dog');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameOverScreen = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');

    const deviceSelection = document.getElementById('device-selection');
    const computerBtn = document.getElementById('computer-btn');
    const mobileBtn = document.getElementById('mobile-btn');

    let device = "computer";
    let score = 0;
    let time = 30;
    let dogPosition = 220;
    let bones = [];
    let gameInterval;
    let boneInterval;
    let timerInterval;

    // Seleção de dispositivo
    computerBtn.addEventListener('click', () => {
        device = "computer";
        deviceSelection.style.display = 'none';
        startBtn.style.display = 'block';
    });

    mobileBtn.addEventListener('click', () => {
        device = "mobile";
        deviceSelection.style.display = 'none';
        startBtn.style.display = 'block';
    });

    // Iniciar jogo
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    function startGame() {
        startBtn.style.display = 'none';
        game.style.display = 'block';
        score = 0;
        time = 30;
        scoreDisplay.textContent = "Pontuação: 0";
        timerDisplay.textContent = "Tempo: 30";
        dogPosition = 220;
        dog.style.left = dogPosition + 'px';

        if(device === "computer") {
            document.addEventListener('keydown', moveDog);
        } else if(device === "mobile") {
            createMobileControls();
        }

        boneInterval = setInterval(createBone, 1500);
        gameInterval = setInterval(moveBones, 20);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function restartGame() {
        gameOverScreen.style.display = 'none';
        bones.forEach(bone => bone.remove());
        bones = [];
        startGame();
    }

    // Movimentação teclado
    function moveDog(e) {
        const step = 20;
        if(e.key === "ArrowLeft" && dogPosition > 0) {
            dogPosition -= step;
            dog.style.left = dogPosition + 'px';
        }
        if(e.key === "ArrowRight" && dogPosition < 440) {
            dogPosition += step;
            dog.style.left = dogPosition + 'px';
        }
    }

    // Controles para celular
    function createMobileControls() {
        const leftBtn = document.createElement('button');
        leftBtn.innerText = '⬅️';
        leftBtn.id = 'left-btn';
        leftBtn.style.position = 'fixed';
        leftBtn.style.bottom = '20px';
        leftBtn.style.left = '50px';
        leftBtn.style.fontSize = '30px';
        document.body.appendChild(leftBtn);

        const rightBtn = document.createElement('button');
        rightBtn.innerText = '➡️';
        rightBtn.id = 'right-btn';
        rightBtn.style.position = 'fixed';
        rightBtn.style.bottom = '20px';
        rightBtn.style.left = '150px';
        rightBtn.style.fontSize = '30px';
        document.body.appendChild(rightBtn);

        leftBtn.addEventListener('touchstart', () => moveDogMobile('left'));
        rightBtn.addEventListener('touchstart', () => moveDogMobile('right'));
    }

    function moveDogMobile(direction) {
        const step = 20;
        if(direction === 'left' && dogPosition > 0) {
            dogPosition -= step;
            dog.style.left = dogPosition + 'px';
        }
        if(direction === 'right' && dogPosition < 440) {
            dogPosition += step;
            dog.style.left = dogPosition + 'px';
        }
    }

    // Criar ossos
    function createBone() {
        const bone = document.createElement('div');
        bone.classList.add('bone');
        bone.style.left = Math.floor(Math.random() * 470) + 'px';
        bone.style.top = '-30px';
        game.appendChild(bone);
        bones.push(bone);
    }

    // Movimentar ossos
    function moveBones() {
        bones.forEach((bone, index) => {
            let top = parseInt(bone.style.top);
            top += 4;
            bone.style.top = top + 'px';

            const dogRect = dog.getBoundingClientRect();
            const boneRect = bone.getBoundingClientRect();

            if(
                boneRect.bottom > dogRect.top &&
                boneRect.left < dogRect.right &&
                boneRect.right > dogRect.left
            ) {
                score++;
                scoreDisplay.textContent = "Pontuação: " + score;
                bone.remove();
                bones.splice(index, 1);
            }

            if(top > 400) {
                bone.remove();
                bones.splice(index, 1);
            }
        });
    }

    // Timer
    function updateTimer() {
        time--;
        timerDisplay.textContent = "Tempo: " + time;
        if(time <= 0) {
            endGame();
        }
    }

    // Fim de jogo
    function endGame() {
        clearInterval(boneInterval);
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        document.removeEventListener('keydown', moveDog);
        game.style.display = 'none';
        finalScore.textContent = "Sua pontuação final: " + score;
        gameOverScreen.style.display = 'block';
    }
});
