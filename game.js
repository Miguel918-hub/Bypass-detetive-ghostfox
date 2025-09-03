const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 800;

// Jogador
const player = {
    x: 50,
    y: 700,
    width: 40,
    height: 60,
    color: '#f0a500',
    dy: 0,
    gravity: 0.6,
    jumpPower: -12,
    onGround: false,
    moveLeft: false,
    moveRight: false,
    score: 0
};

// Plataformas
let platforms = [
    {x:0, y:760, width:600, height:40, color:'#444'},
    {x:150, y:600, width:120, height:20, color:'#777'},
    {x:350, y:500, width:120, height:20, color:'#777'},
    {x:200, y:400, width:120, height:20, color:'#777'}
];

// Inimigos
let enemies = [
    {x:300, y:720, width:40, height:40, color:'#ff0000', dx:2},
    {x:400, y:460, width:40, height:40, color:'#ff0000', dx:-2}
];

// Itens coletáveis
let items = [
    {x:170, y:560, width:20, height:20, color:'#00ff00', collected:false},
    {x:370, y:460, width:20, height:20, color:'#00ff00', collected:false}
];

// Tempo
let times = ['Passado','Presente','Futuro'];
let currentTime = 1;
const timeButton = document.getElementById('timeButton');
const timeLabel = document.getElementById('timeLabel');
const scoreLabel = document.getElementById('scoreLabel');

timeButton.addEventListener('click', () => {
    currentTime = (currentTime + 1) % 3;
    timeLabel.textContent = 'Tempo: ' + times[currentTime];
    // Alterar plataformas dependendo do tempo
    switch(currentTime){
        case 0:
            platforms[1].color = '#228B22';
            platforms[2].color = '#8B4513';
            break;
        case 1:
            platforms[1].color = '#777';
            platforms[2].color = '#777';
            break;
        case 2:
            platforms[1].color = '#00FFFF';
            platforms[2].color = '#00FFFF';
            break;
    }
});

// Controles teclado
let keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Controles mobile
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');

// Eventos mobile corrigidos
leftBtn.addEventListener('touchstart', e=>{ e.preventDefault(); player.moveLeft=true; });
leftBtn.addEventListener('touchend', e=>{ e.preventDefault(); player.moveLeft=false; });

rightBtn.addEventListener('touchstart', e=>{ e.preventDefault(); player.moveRight=true; });
rightBtn.addEventListener('touchend', e=>{ e.preventDefault(); player.moveRight=false; });

jumpBtn.addEventListener('touchstart', e=>{
    e.preventDefault();
    if(player.onGround){
        player.dy = player.jumpPower;
        player.onGround = false;
    }
});

// Loop principal
function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Movimento jogador
    if(keys['ArrowLeft'] || keys['a'] || player.moveLeft) player.x -= 5;
    if(keys['ArrowRight'] || keys['d'] || player.moveRight) player.x += 5;
    if((keys['ArrowUp'] || keys['w'] || keys[' ']) && player.onGround){
        player.dy = player.jumpPower;
        player.onGround = false;
    }

    // Gravidade
    player.dy += player.gravity;
    player.y += player.dy;

    // Colisão plataformas
    player.onGround = false;
    platforms.forEach(p => {
        if(player.x < p.x + p.width &&
           player.x + player.width > p.x &&
           player.y + player.height < p.y + 20 &&
           player.y + player.height > p.y){
            player.y = p.y - player.height;
            player.dy = 0;
            player.onGround = true;
        }
    });

    // Colisão com itens
    items.forEach(item=>{
        if(!item.collected &&
           player.x < item.x + item.width &&
           player.x + player.width > item.x &&
           player.y < item.y + item.height &&
           player.y + player.height > item.y){
               item.collected = true;
               player.score++;
               scoreLabel.textContent = 'Itens: ' + player.score;
        }
    });

    // Movimento inimigos
    enemies.forEach(e=>{
        e.x += e.dx;
        if(e.x < 0 || e.x + e.width > canvas.width) e.dx *= -1;
        if(player.x < e.x + e.width &&
           player.x + player.width > e.x &&
           player.y < e.y + e.height &&
           player.y + player.height > e.y){
               // Reinicia jogador
               player.x = 50;
               player.y = 700;
               player.dy = 0;
               player.score = 0;
               items.forEach(i=>i.collected=false);
               scoreLabel.textContent = 'Itens: 0';
        }
    });

    // Desenhar plataformas
    platforms.forEach(p=>{
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,p.width,p.height);
    });

    // Desenhar itens
    items.forEach(i=>{
        if(!i.collected){
            ctx.fillStyle = i.color;
            ctx.fillRect(i.x,i.y,i.width,i.height);
        }
    });

    // Desenhar inimigos
    enemies.forEach(e=>{
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x,e.y,e.width,e.height);
    });

    // Desenhar jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x,player.y,player.width,player.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();
