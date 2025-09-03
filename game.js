// Ajustar pulo do jogador para celular
player.jumpPower = -15; // antes estava -12

// Exemplo de plataformas intermediárias
platforms = [
    {x:0, y:760, width:600, height:40, color:'#444'},
    {x:150, y:650, width:120, height:20, color:'#777'}, // mais baixa
    {x:350, y:550, width:120, height:20, color:'#777'}, // intermediária
    {x:200, y:450, width:120, height:20, color:'#777'}  // mais alta
];

// Exemplo de itens dependentes do tempo
items = [
    {x:170, y:620, width:20, height:20, color:'#00ff00', collected:false, time:1}, // Presente
    {x:370, y:510, width:20, height:20, color:'#00ff00', collected:false, time:2}  // Futuro
];

// Coletar itens apenas se o tempo estiver correto
items.forEach(item=>{
    if(!item.collected && currentTime === item.time &&
       player.x < item.x + item.width &&
       player.x + player.width > item.x &&
       player.y < item.y + item.height &&
       player.y + player.height > item.y){
           item.collected = true;
           player.score++;
           scoreLabel.textContent = 'Itens: ' + player.score;
    }
});
