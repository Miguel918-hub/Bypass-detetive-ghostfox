// Scroll suave para seções
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Envio de formulário de contato
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita envio real

  // Mensagem de sucesso
  formMessage.style.color = '#00ffcc';
  formMessage.textContent = 'Mensagem enviada com sucesso!';

  // Limpa o formulário
  contactForm.reset();

  // Remove mensagem após 5 segundos
  setTimeout(() => {
    formMessage.textContent = '';
  }, 5000);
});

// Envio do formulário Bypass (encurtador)
const bypassForm = document.getElementById('bypassForm');
const bypassMessage = document.getElementById('bypassMessage');

bypassForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const link = document.getElementById('shortLink').value;
  if (link) {
    bypassMessage.style.color = '#00ffcc';
    bypassMessage.textContent = `Link processado com sucesso: ${link}`;
    bypassForm.reset();

    // Remove mensagem após 5 segundos
    setTimeout(() => {
      bypassMessage.textContent = '';
    }, 5000);
  } else {
    bypassMessage.style.color = '#ff4d4d';
    bypassMessage.textContent = 'Por favor, insira um link válido.';
  }
});
