// === FORMULÁRIO ===
document.querySelector('.order-form').addEventListener('submit', function(e) {
  e.preventDefault(); // evitar envio tradicional

  // pegar dados do formulário
  const nome = this.nome.value.trim();
  const email = this.email.value.trim();
  const telefone = this.telefone.value.trim();
  const endereco = this.endereco.value.trim();
  const produto = this.produto.value.trim();
  const data_entrega = this.data_entrega.value;
  const hora_entrega = this.hora_entrega.value; // agora pega do input time
  const observacoes = this.observacoes.value.trim();

  // mensagens de erro visuais
  const erroEmail = document.querySelector('.erro-email');
  const erroData = document.querySelector('.erro-data');
  const erroHora = document.querySelector('.erro-hora');

  // validar campos obrigatórios
  if (!nome || !email || !telefone || !endereco || !produto || !data_entrega || !hora_entrega) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // validação de email
  if (!email.includes('@') || !email.includes('.')) {
    erroEmail.style.display = 'block';
    return;
  } else {
    erroEmail.style.display = 'none';
  }

  // validação de telefone (apenas números e pelo menos 10 dígitos)
  const regexTelefone = /^[0-9]{10,11}$/; // 10 ou 11 dígitos
  if (!regexTelefone.test(telefone)) {
    alert('Telefone inválido! Digite apenas números (DDD + número, ex: 11999999999).');
    return;
  }

  // validação de data (não pode ser passada e nem muito no futuro)
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // zera hora
  const dataSelecionada = new Date(data_entrega);
  dataSelecionada.setHours(0, 0, 0, 0);

  const limiteFuturo = new Date("2100-12-31");

  if (dataSelecionada < hoje || dataSelecionada > limiteFuturo) {
    erroData.style.display = 'block';
    return;
  } else {
    erroData.style.display = 'none';
  }

  // validação de nome (mínimo 3 caracteres, só letras e espaços)
  const regexNome = /^[A-Za-zÀ-ÿ\s]{3,}$/;
  if (!regexNome.test(nome)) {
    alert('Digite um nome válido (apenas letras e no mínimo 3 caracteres).');
    return;
  }

  // validação do horário (apenas entre 08:00 e 22:00)
  if (hora_entrega < "08:00" || hora_entrega > "22:00") {
    erroHora.style.display = "block";
    return;
  } else {
    erroHora.style.display = "none";
  }

  // montar mensagem para WhatsApp
  let mensagem = `*Pedido feito na Tutano Log*%0A`;
  mensagem += `👤 Nome: ${nome}%0A`;
  mensagem += `📧 Email: ${email}%0A`;
  mensagem += `📱 Telefone: ${telefone}%0A`;
  mensagem += `🏠 Endereço: ${endereco}%0A`;
  mensagem += `📦 Produto: ${produto}%0A`;
  mensagem += `📅 Data de entrega: ${data_entrega}%0A`;
  mensagem += `⏰ Horário de entrega: ${hora_entrega}%0A`;
  if (observacoes) mensagem += `%0A📝 Observações: ${observacoes}`;

  const numeroFixo = "5511941951299";
  const urlWhatsapp = `https://wa.me/${numeroFixo}?text=${mensagem}`;
  window.open(urlWhatsapp, '_blank');
});


// === FAQ interativo ===
document.addEventListener('DOMContentLoaded', () => {
  const faqs = document.querySelectorAll('#faq dt');

  faqs.forEach(dt => {
    dt.addEventListener('click', () => {
      const dd = dt.nextElementSibling;
      if (!dd) return;
      dd.classList.toggle('open');
    });
  });
});


// === MENU HAMBÚRGUER ===
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.querySelector(".side-menu");
  const closeMenuBtn = document.querySelector(".close-menu");

  hamburger.addEventListener("click", () => {
    sideMenu.classList.add("open");
  });

  closeMenuBtn.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });

  window.addEventListener("click", (e) => {
    if (
      sideMenu.classList.contains("open") &&
      !sideMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sideMenu.classList.remove("open");
    }
  });
});


// === ANIMAÇÕES AO SCROLL ===
function animarAoScroll() {
  const elementos = document.querySelectorAll("[data-animate]");
  const topoJanela = window.innerHeight * 0.85;

  elementos.forEach(el => {
    const distancia = el.getBoundingClientRect().top;
    if (distancia < topoJanela) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", animarAoScroll);
window.addEventListener("load", animarAoScroll);


// === BLOQUEAR LETRAS NO TELEFONE ===
document.addEventListener('DOMContentLoaded', function () {
  const telefoneInput = document.querySelector('.order-form input[name="telefone"]');

  // Cria a mensagem de erro
  const telefoneErro = document.createElement('p');
  telefoneErro.textContent = 'Digite apenas números no telefone.';
  telefoneErro.style.color = 'red';
  telefoneErro.style.fontSize = '0.8rem';
  telefoneErro.style.marginTop = '5px';
  telefoneErro.style.display = 'none';

  // Insere a mensagem após o campo
  telefoneInput.insertAdjacentElement('afterend', telefoneErro);

  // Bloqueia letras no input
  telefoneInput.addEventListener('input', function () {
    const original = this.value;
    const somenteNumeros = original.replace(/[^\d\s()-]/g, '');
    this.value = somenteNumeros;

    // Se digitou algo inválido, mostra o erro
    if (original !== somenteNumeros) {
      telefoneErro.style.display = 'block';
    } else {
      telefoneErro.style.display = 'none';
    }
  });
});


// === REGRAS DE DATA E HORA ===
document.addEventListener("DOMContentLoaded", () => {
  const campoData = document.getElementById("data_entrega");
  const erroData = document.querySelector(".erro-data");
  const campoHora = document.getElementById("hora_entrega");
  const erroHora = document.querySelector(".erro-hora");

  // Define o mínimo da data como hoje
  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  campoData.min = `${yyyy}-${mm}-${dd}`;

  campoData.addEventListener("input", () => {
    if (campoData.value < campoData.min) {
      erroData.style.display = "block";
    } else {
      erroData.style.display = "none";
    }
  });

  campoHora.addEventListener("input", () => {
    if (campoHora.value < "08:00" || campoHora.value > "22:00") {
      erroHora.style.display = "block";
    } else {
      erroHora.style.display = "none";
    }
  });
});

// === MODAL DE DETALHES DOS CARDS ===
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('card-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Pega título, imagem e descrição do card clicado
      const titulo = card.querySelector('h3').innerText;
      const imagemSrc = card.querySelector('img').src;
      const descricao = card.querySelector('p').innerText;

      // Insere no modal
      modalContent.innerHTML = `
        <h3>${titulo}</h3>
        <img src="${imagemSrc}" alt="${titulo}" style="width:100%; margin:10px 0;" />
        <p>${descricao}</p>
      `;

      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Fechar clicando fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});


// === PREENCHE FORM AO CLICAR EM UM CARD ===
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const formServicoInput = document.getElementById('servico_escolhido');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const titulo = card.querySelector('h3').innerText;

      // Preenche o input hidden do form
      formServicoInput.value = titulo;

      // Opcional: se quiser, abre o modal também
      const modal = document.getElementById('card-modal');
      const modalContent = document.getElementById('modal-content');
      const closeModal = document.getElementById('close-modal');

      const imagemSrc = card.querySelector('img').src;
      const descricao = card.querySelector('p').innerText;

      modalContent.innerHTML = `
        <h3>${titulo}</h3>
        <img src="${imagemSrc}" alt="${titulo}" style="width:100%; margin:10px 0;" />
        <p>${descricao}</p>
      `;

      modal.style.display = 'flex';

      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
  });
});

// === BOTÃO DO CARD PARA IR AO FORMULÁRIO ===
document.addEventListener('DOMContentLoaded', () => {
  const botaoCards = document.querySelectorAll('.btn-solicitar');
  const formServicoInput = document.getElementById('servico_escolhido');
  const formSection = document.getElementById('pedido-button');

  botaoCards.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que abra o modal se clicar no botão dentro do card
      const card = botao.closest('.service-card');
      const titulo = card.querySelector('h3').innerText;

      // Preenche o input oculto do form
      formServicoInput.value = titulo;

      // Rola suavemente até o formulário
      formSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('card-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  const formServicoInput = document.getElementById('servico_escolhido');
  const formSection = document.getElementById('pedido-button');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const titulo = card.querySelector('h3').innerText;
      const imagemSrc = card.querySelector('img').src;
      const descricao = card.querySelector('p').innerText;

      // Conteúdo do modal + botão dinâmico
      modalContent.innerHTML = `
        <h3>${titulo}</h3>
        <img src="${imagemSrc}" alt="${titulo}" style="width:100%; margin:10px 0; border-radius:8px;" />
        <p style="color: white ">${descricao}</p>
        <button id="btn-modal-solicitar" style="background-color: #3399ff;
  color: white;
  font-weight: 700;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 8px #3399ffaa; margin-top: 20px; font-size: 15px">Solicitar este serviço</button>
      `;

      modal.style.display = 'flex';

      // Botão dentro do modal
      const btnSolicitar = document.getElementById('btn-modal-solicitar');
      btnSolicitar.addEventListener('click', () => {
        formServicoInput.value = titulo;             // Preenche o form
        modal.style.display = 'none';                // Fecha o modal
        formSection.scrollIntoView({ behavior: 'smooth' }); // Rola pro form
      });
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
