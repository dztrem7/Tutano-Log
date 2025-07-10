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
  const hora_entrega = this.hora_entrega.value;
  const observacoes = this.observacoes.value.trim();

  // mensagens de erro visuais
  const erroEmail = document.querySelector('.erro-email');
  const erroData = document.querySelector('.erro-data');

  // validar campos obrigatórios
  if (!nome || !email || !telefone || !endereco || !produto || !data_entrega || !hora_entrega) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // validação de email
  if (!email.includes('@')) {
    erroEmail.style.display = 'block';
    return;
  } else {
    erroEmail.style.display = 'none';
  }

  // validação de data
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // zera hora
  const dataSelecionada = new Date(data_entrega);
  dataSelecionada.setHours(0, 0, 0, 0);

  if (dataSelecionada < hoje) {
    erroData.style.display = 'block';
    return;
  } else {
    erroData.style.display = 'none';
  }

  // montar mensagem para WhatsApp
  let mensagem = `*Pedido feito na Tutano Log*%0A`;
  mensagem += `Nome: ${nome}%0A`;
  mensagem += `Email: ${email}%0A`;
  mensagem += `Telefone: ${telefone}%0A`;
  mensagem += `Endereço: ${endereco}%0A`;
  mensagem += `Produto: ${produto}%0A`;
  mensagem += `Data de entrega: ${data_entrega}%0A`;
  mensagem += `Horário preferido: ${hora_entrega}%0A`;
  if (observacoes) mensagem += `Observações: ${observacoes}%0A`;

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
