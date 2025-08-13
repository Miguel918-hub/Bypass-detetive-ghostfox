<?php
// index.php
// Aqui você pode adicionar PHP, por enquanto só vai servir o HTML estático abaixo
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Reich - Arts</title>
<style>
    body {
        margin: 0;
        padding: 0;
        background: #1b1f2a;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
        font-family: Arial, sans-serif;
        color: white;
        flex-direction: column;
    }
    img {
        width: 400px;
        border-radius: 15px;
        box-shadow: 0 0 40px rgba(0, 150, 255, 0.8);
        animation: glow 3s infinite alternate;
    }
    @keyframes glow {
        from { box-shadow: 0 0 20px rgba(0, 150, 255, 0.6); }
        to { box-shadow: 0 0 60px rgba(0, 200, 255, 1); }
    }
    h1 {
        margin-top: 20px;
        font-size: 4rem;
        letter-spacing: 3px;
        text-shadow: 0 0 10px #00cfff, 0 0 20px #00cfff, 0 0 40px #00cfff;
        animation: pulse 2s infinite alternate;
    }
    @keyframes pulse {
        from { text-shadow: 0 0 10px #00cfff, 0 0 20px #00cfff; }
        to { text-shadow: 0 0 20px #00cfff, 0 0 40px #00cfff; }
    }
</style>
</head>
<body>
    <img src="imagens/logo.png" alt="Reich" />
    <h1>REICH</h1>
</body>
</html>
