document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu mobile acessível
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
      mainNav.classList.toggle('is-open');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });
  }

  // 2. Filtro de produtos com atualização de estado ARIA
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const category = btn.dataset.filter;

      productCards.forEach((card) => {
        const match = category === 'todos' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  // 3. Preenchimento contextual ao clicar em "Solicitar ficha técnica"
  const techSheetButtons = document.querySelectorAll('.btn-text');
  const messageTextarea = document.getElementById('mensagem');
  const contactSection = document.getElementById('showroom');

  techSheetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.produto;
      if (messageTextarea && contactSection) {
        messageTextarea.value = `Olá, gostaria de receber a ficha técnica, dimensões e opções de acabamento da peça: ${productName}.`;
        contactSection.scrollIntoView({ behavior: 'smooth' });
        messageTextarea.focus();
      }
    });
  });

  // 4. Validação acessível do formulário
  const form = document.getElementById('form-contato');
  const statusEl = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      const nomeInput = document.getElementById('nome');
      const emailInput = document.getElementById('email');
      const erroNome = document.getElementById('erro-nome');
      const erroEmail = document.getElementById('erro-email');

      erroNome.textContent = '';
      erroEmail.textContent = '';
      nomeInput.removeAttribute('aria-invalid');
      emailInput.removeAttribute('aria-invalid');

      if (!nomeInput.value.trim()) {
        erroNome.textContent = 'Informe seu nome completo.';
        nomeInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        erroEmail.textContent = 'Insira um endereço de e-mail válido.';
        emailInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      }

      if (isValid) {
        statusEl.style.color = 'var(--success-green)';
        statusEl.textContent = 'Solicitação recebida. Nossa equipe retornará em até 1 dia útil.';
        form.reset();
      } else {
        statusEl.style.color = 'var(--error-red)';
        statusEl.textContent = 'Corrija os campos indicados acima para prosseguir.';
      }
    });
  }
});