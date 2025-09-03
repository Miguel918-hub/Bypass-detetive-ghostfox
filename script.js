// Função para scroll suave para qualquer seção
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Envio de formulário simulado
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede envio real

  // Mostra mensagem de sucesso
  formMessage.style.color = '#00ffcc';
  formMessage.textContent = 'Mensagem enviada com sucesso!';

  // Limpa o formulário
  form.reset();

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    formMessage.textContent = '';
  }, 5000);
});
