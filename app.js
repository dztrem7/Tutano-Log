// === MENU HAMBÚRGUER ===
const menuToggle = document.querySelector('.hamburger');
const sideMenu = document.querySelector('.side-menu');
const closeMenuBtn = document.querySelector('.close-menu');

if (menuToggle && sideMenu && closeMenuBtn) {
  menuToggle.addEventListener('click', () => sideMenu.classList.add('open'));
  closeMenuBtn.addEventListener('click', () => sideMenu.classList.remove('open'));
  window.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });
}

// === ANIMAÇÕES AO ROLAR ===
const elementosAnimados = document.querySelectorAll("[data-animate]");
function animarAoScroll() {
  const topoJanela = window.innerHeight * 0.85;
  elementosAnimados.forEach(el => {
    const distancia = el.getBoundingClientRect().top;
    if (distancia < topoJanela) el.classList.add("show");
  });
}
if (elementosAnimados.length) {
  window.addEventListener("scroll", animarAoScroll);
  window.addEventListener("load", animarAoScroll);
}

// === MODAL DE DETALHES DOS CARDS ===
const cards = document.querySelectorAll('.service-card');
const modal = document.getElementById('card-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const formServicoInput = document.getElementById('servico_escolhido');
const formSection = document.getElementById('pedido-button');

if (cards.length && modal && modalContent && closeModal && formServicoInput && formSection) {
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const titulo = card.querySelector('h3').innerText;
      const imagemSrc = card.querySelector('img')?.src || '';
      const descricao = card.querySelector('p')?.innerText || '';

      modalContent.innerHTML = `
        <h3>${titulo}</h3>
        ${imagemSrc ? `<img src="${imagemSrc}" alt="${titulo}" style="width:100%; margin:10px 0; border-radius:8px;" />` : ''}
        <p style="color:white">${descricao}</p>
        <button id="btn-modal-solicitar" style="
          background-color:#3399ff;color:white;font-weight:700;
          border:none;padding:10px 20px;border-radius:30px;cursor:pointer;
          margin-top:20px;font-size:15px;box-shadow:0 0 8px #3399ffaa;
        ">Solicitar este serviço</button>
      `;
      modal.style.display = 'flex';

      const btnSolicitar = document.getElementById('btn-modal-solicitar');
      if (btnSolicitar) {
        btnSolicitar.addEventListener('click', () => {
          formServicoInput.value = titulo;
          modal.style.display = 'none';
          formSection.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  });

  closeModal.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
}

// === FORMULÁRIO / WHATSAPP ===
const form = document.querySelector('.order-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = this.nome?.value.trim() || '';
    const email = this.email?.value.trim() || '';
    const telefone = this.telefone?.value.trim() || '';
    const endereco = this.endereco?.value.trim() || '';
    const produto = this.produto?.value.trim() || '';
    const data_retirada = this.data_retirada?.value || '';
    const hora_retirada = this.hora_retirada?.value || '';
    const observacoes = this.observacoes?.value.trim() || '';

    const erroEmail = document.querySelector('.erro-email');
    const erroData = document.querySelector('.erro-data');
    const erroHora = document.querySelector('.erro-hora');

    if (!nome || !email || !telefone || !endereco || !produto || !data_retirada || !hora_retirada) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      if (erroEmail) erroEmail.style.display = 'block';
      return;
    } else if (erroEmail) {
      erroEmail.style.display = 'none';
    }

    const regexTelefone = /^[0-9]{10,11}$/;
    if (!regexTelefone.test(telefone.replace(/\D/g, ''))) {
      alert('Telefone inválido! Digite apenas números (DDD + número).');
      return;
    }

    const regexNome = /^[A-Za-zÀ-ÿ\s]{3,}$/;
    if (!regexNome.test(nome)) {
      alert('Digite um nome válido (apenas letras e no mínimo 3 caracteres).');
      return;
    }

    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(data_retirada); dataSelecionada.setHours(0, 0, 0, 0);
    const limiteFuturo = new Date("2100-12-31");
    if (dataSelecionada < hoje || dataSelecionada > limiteFuturo) {
      if (erroData) erroData.style.display = 'block';
      return;
    } else if (erroData) erroData.style.display = 'none';

    if (hora_retirada < "08:00" || hora_retirada > "22:00") {
      if (erroHora) erroHora.style.display = 'block';
      return;
    } else if (erroHora) erroHora.style.display = 'none';

    let mensagem = `*Pedido feito na Tutano Log*\n`;
    mensagem += `👤 Nome: ${nome}\n`;
    mensagem += `📧 Email: ${email}\n`;
    mensagem += `📱 Telefone: ${telefone}\n`;
    mensagem += `🏠 Endereço: ${endereco}\n`;
    mensagem += `📦 Produto: ${produto}\n`;
    mensagem += `📅 Data de retirada: ${data_retirada}\n`;
    mensagem += `⏰ Horário de retirada: ${hora_retirada}\n`;
    if (observacoes) mensagem += `📝 Observações: ${observacoes}`;

    // Codifica toda a mensagem para URL
    const urlWhatsapp = `https://wa.me/5511941951299?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsapp, '_blank');
  });
}
