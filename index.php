<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Bypass Detetive GhostFox</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #1e1e2e;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background: #111127;
      padding: 1.5rem;
      text-align: center;
    }
    header h1 {
      margin: 0;
      font-size: 2.5rem;
      color: #8ab4f8;
    }
    main {
      flex: 1;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    form {
      margin-top: 2rem;
    }
    input[type="text"] {
      padding: 0.7rem;
      width: 70%;
      border: none;
      border-radius: 5px;
      margin-right: 0.5rem;
    }
    button {
      padding: 0.7rem 1.5rem;
      background: #7289da;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover {
      background: #5b6eae;
    }
    .resultado {
      margin-top: 2rem;
      background: #22223b;
      padding: 1rem;
      border-radius: 8px;
    }
    footer {
      background: #111127;
      padding: 1rem;
      text-align: center;
      font-size: 0.9rem;
      color: #888;
    }
    a.discord {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      font-size: 1.1rem;
      color: #fff;
      background: #5865f2;
      border-radius: 5px;
      text-decoration: none;
    }
    a.discord:hover {
      background: #4752c4;
    }
  </style>
</head>
<body>

  <header>
    <h1>Bypass Detetive GhostFox</h1>
  </header>

  <main>
    <p>Cole abaixo o link encurtado que deseja desbloquear:</p>
    <form method="POST">
      <input type="text" name="url" placeholder="https://exemplo.com/link" required>
      <button type="submit">Bypass!</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $url = trim($_POST["url"]);

        function getFinalURL($url) {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 20);
            curl_exec($ch);
            $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
            curl_close($ch);
            return $finalUrl;
        }

        $resultado = getFinalURL($url);

        if ($resultado) {
            echo "<div class='resultado'>";
            echo "<h2>🔓 Link desbloqueado:</h2>";
            echo "<p><a href='$resultado' target='_blank'>$resultado</a></p>";
            echo "</div>";
        } else {
            echo "<div class='resultado'>";
            echo "<h2>❌ Erro:</h2>";
            echo "<p>Não foi possível processar este link.</p>";
            echo "</div>";
        }
    }
    ?>

    <a class="discord" href="https://discord.gg/W3XbPKAca9" target="_blank">Entrar no Discord</a>
  </main>

  <footer>
    © 2025 Bypass Detetive GhostFox — Todos os direitos reservados.
  </footer>

</body>
</html>
