function showSection(id) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// Mostra a primeira seção por padrão
showSection('world');
