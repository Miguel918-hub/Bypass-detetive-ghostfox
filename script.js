const bypassForm = document.getElementById('bypassForm');
const bypassMessage = document.getElementById('bypassMessage');

bypassForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const link = document.getElementById('shortLink').value;

  if (!link) {
    bypassMessage.style.color = '#ff4d4d';
    bypassMessage.textContent = 'Por favor, insira um link válido.';
    return;
  }

  try {
    bypassMessage.style.color = '#00ffcc';
    bypassMessage.textContent = 'Processando link...';

    const response = await fetch('/api/bypass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: link })
    });

    const data = await response.json();
    if (data.finalLink) {
      bypassMessage.innerHTML = `Link final: <a href="${data.finalLink}" target="_blank">${data.finalLink}</a>`;
    } else {
      bypassMessage.textContent = 'Falha ao processar o link.';
    }

  } catch (err) {
    bypassMessage.style.color = '#ff4d4d';
    bypassMessage.textContent = 'Erro ao processar o link.';
  }

  bypassForm.reset();
});
