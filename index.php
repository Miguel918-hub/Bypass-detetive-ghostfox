<?php
// Configuração: nome da pasta onde estão as artes
$arts_dir = __DIR__ . '/arts';

// Busca todas as imagens com extensão jpg, jpeg, png ou gif na pasta
$images = glob($arts_dir . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

// Se não encontrar nenhuma imagem, use essa imagem padrão (coloque no seu site)
$default_image = 'https://seusite.com/default-art.jpg';

if (!$images || count($images) === 0) {
    $image_url = $default_image;
} else {
    // Escolhe uma imagem aleatória
    $random_image = $images[array_rand($images)];
    
    // Pega o nome da imagem (ex: arte1.png)
    $image_name = basename($random_image);
    
    // Monte a URL pública da imagem - troque seu domínio abaixo
    $image_url = "https://seusite.com/arts/" . $image_name;
}

// Título e descrição para o preview
$title = "Reich - Arts";
$description = "Confira artes incríveis criadas por Reich!";

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <title><?php echo htmlspecialchars($title); ?></title>

    <!-- Metadados Open Graph para prévia em Discord, WhatsApp e Facebook -->
    <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>" />
    <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>" />
    <meta property="og:image" content="<?php echo htmlspecialchars($image_url); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://seusite.com" />
</head>
<body>
    <h1><?php echo htmlspecialchars($title); ?></h1>
    <p><?php echo htmlspecialchars($description); ?></p>
    <img src="<?php echo htmlspecialchars($image_url); ?>" alt="Arte de Reich" style="max-width:100%; height:auto;" />
</body>
</html>
