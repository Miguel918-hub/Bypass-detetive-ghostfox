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
    gravity: 0.7,
    jumpPower: -15,
    onGround: false,
    moveLeft: false,
    moveRight: false,
    score: 0
};

// Plataformas escalonadas (alturas ajustadas para o pulo)
let platforms = [
    {x:0, y:760, width:600, height:40, color:'#444'},
    {x:50, y:700, width:100, height:20, color:'#777'},
    {x:200, y:640, width:100, height:20, color:'#777'},
    {x:350, y:580, width:100, height:20, color:'#777'},
    {x:150, y:520, width:100, height:20, color:'#777'},
    {x:300, y:460, width:100, height:20, color:'#777'},
    {x:100, y:400, width:120, height:20, color:'#777'},
    {x:250, y:340, width:120, height:20, color:'#777'},
    {x:150, y:280, width:120, height:20, color:'#777'},
    {x:250, y:220, width:120, height:20, color:'#777'}
];

// Inimigos
let enemies = [
    {x:150, y:640, width:40, height:40, color:'#ff0000', dx:2},
    {x:400, y:500, width:40, height:40, color:'#ff0000', dx:-2},
    {x:200, y:360, width:40, height:40, color:'#ff0000', dx:2}
];

// Itens colecionáveis
let items = [
    {x:70, y:640, width:20, height:20, color:'#00ff00', collected:false},
    {x:220, y:560, width:20, height:20, color:'#00ff00', collected:false},
    {x:370, y:480, width:20, height:20, color:'#00ff00', collected:false},
    {x:170, y:400, width:20, height:20, color:'#00ff00', collected:false},
    {x:320, y:320, width:20, height:20, color:'#00ff00', collected:false},
    {x:150, y:240, width:20, height:20, color:'#00ff00', collected:false}
];

// Controles teclado
let keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Controles mobile
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');
function preventDefaultTouch(e){ e.preventDefault(); }
leftBtn.addEventListener('touchstart', e=>{ preventDefaultTouch(e); player.moveLeft=true; });
leftBtn.addEventListener('touchend', e=>{ preventDefaultTouch(e); player.moveLeft=false; });
rightBtn.addEventListener('touchstart', e=>{ preventDefaultTouch(e); player.moveRight=true; });
rightBtn.addEventListener('touchend', e=>{ preventDefaultTouch(e); player.moveRight=false; });
jumpBtn.addEventListener('touchstart', e=>{
    preventDefaultTouch(e);
    if(player.onGround){ player.dy = player.jumpPower; player.onGround=false; }
});

// Pausa
let paused = false;
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.textContent = paused ? '▶️' : '⏸️';
});

// Loop principal
function gameLoop(){
    if(!paused){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Movimento jogador
        if(keys['ArrowLeft'] || keys['a'] || player.moveLeft) player.x -= 5;
        if(keys['ArrowRight'] || keys['d'] || player.moveRight) player.x += 5;
        if((keys['ArrowUp'] || keys['w'] || keys[' ']) && player.onGround){
            player.dy = player.jumpPower; player.onGround = false;
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

        // Coletar itens
        items.forEach(item=>{
            if(!item.collected &&
               player.x < item.x + item.width &&
               player.x + player.width > item.x &&
               player.y < item.y + item.height &&
               player.y + player.height > item.y){
                   item.collected = true;
                   player.score++;
                   document.getElementById('scoreLabel').textContent = 'Pontos: ' + player.score;
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
                   items.forEach(i=>i.collected=false
