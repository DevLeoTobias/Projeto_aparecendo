document.addEventListener('DOMContentLoaded', () => {
  // ScrollSpy do Bootstrap
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  }

  // Fecha o menu no mobile após clicar
  const navbarToggler = document.querySelector('.navbar-toggler');
  const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
  responsiveNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // Botão "Voltar ao topo"
  const btnTopo = document.getElementById('btnTopo');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botão "Quero aparecer"
  const botaoComecar = document.getElementById('btnComecar');
  botaoComecar.addEventListener('click', () => {
    document.querySelector('#planos').scrollIntoView({ behavior: 'smooth' });
  });

  // Contador de cliques
  let contador = 0;
  botaoComecar.addEventListener('click', () => {
    contador++;
    console.log(`Botão clicado ${contador}x`);
  });

  // Animação dos cards
  const cards = document.querySelectorAll('.plano-card');
  cards.forEach((card) => {
    card.addEventListener('mouseover', () => {
      card.style.borderColor = 'red';
    });
    card.addEventListener('mouseout', () => {
      card.style.borderColor = 'transparent';
    });
  });
  
});



 // Objeto congelado com os links oficiais de pagamento
const linksPagamento = Object.freeze({
    visibilidade: {
      mensal: "https://checkout.infinitepay.io/apparecendo?items=[{\"name\":\"Plano+Visibilidade+(Mensal)\",\"price\":50000,\"quantity\":1}]&redirect_url=https://apparecendo.com/obrigado",
      trimestral: "https://checkout.infinitepay.io/apparecendo?items=[{\"name\":\"Plano+Visibilidade+(Trimestral)\",\"price\":120000,\"quantity\":1}]&redirect_url=https://apparecendo.com/obrigado"
    },
    impulso: {
        mensal: "https://checkout.infinitepay.io/apparecendo?items=[{\"name\":\"Plano+Impulso+(Mensal)\",\"price\":80000,\"quantity\":1}]&redirect_url=https://apparecendo.com/obrigado",
        trimestral: "https://checkout.infinitepay.io/apparecendo?items=[{\"name\":\"Plano+Impulso+(Trimestral)\",\"price\":210000,\"quantity\":1}]&redirect_url=https://apparecendo.com/obrigado"
    }
});

let planosData = {
    visibilidade: {
        selecionado: false,
        periodo: 'trimestral',
        valor: 500,
        valorTotal: 1500
    },
    impulso: {
        selecionado: false,
        periodo: 'trimestral',
        valor: 800,
        valorTotal: 2400
    }
};

document.addEventListener('DOMContentLoaded', function () {
    initializePricingOptions();
});

function initializePricingOptions() {
    document.querySelectorAll('.opcao-preco').forEach(opcao => {
        opcao.addEventListener('click', function () {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;

            const groupName = radio.name;

            document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                r.closest('.opcao-preco').classList.remove('selecionada');
            });

            this.classList.add('selecionada');

            const plano = this.dataset.plano;
            const periodo = this.dataset.periodo;
            const valor = parseInt(this.dataset.valor);

            if (planosData[plano]) {
                planosData[plano].periodo = periodo;
                planosData[plano].valor = valor;
                planosData[plano].valorTotal = periodo === 'trimestral' ? valor * 3 : valor;
            }
        });
    });

    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        radio.closest('.opcao-preco').classList.add('selecionada');
    });
}

/* function processarPagamento(plano) {
    if (!planosData[plano]) {
        alert('Plano inválido.');
        console.error('Plano não reconhecido:', plano);
        return;
    }

    const radioSelecionado = document.querySelector(`input[name="preco-${plano}"]:checked`);
    if (!radioSelecionado) {
        alert('Por favor, selecione uma opção de pagamento.');
        return;
    }

    const opcaoSelecionada = radioSelecionado.closest('.opcao-preco');
    const periodo = opcaoSelecionada.dataset.periodo;

    planosData[plano].selecionado = true;
    planosData[plano].periodo = periodo;

    const valor = planosData[plano].valor;
    const valorTotal = periodo === 'trimestral' ? valor * 3 : valor;

    const dadosPlano = {
        nome: plano,
        periodo,
        valorMensal: valor,
        valorTotal
    };

    processarPagamentoAPI(dadosPlano);
} */

function processarPagamentoAPI(dadosPlano) {
    const { nome, periodo } = dadosPlano;

    const linkPlano = linksPagamento[nome];
    if (!linkPlano || !linkPlano[periodo]) {
        alert('Erro ao processar o pagamento. Plano ou período inválido.');
        console.error('Dados inválidos para pagamento:', dadosPlano);
        return;
    }

    const urlPagamento = linkPlano[periodo];

    // Redireciona com segurança
    window.location.href = urlPagamento;
}

function solicitarConsultoria() {
    console.log('Solicitando consultoria...');
    alert('Em breve entraremos em contato para uma consultoria personalizada!');
    
    // Futuro: enviar para seu backend ou CRM
    /*
    fetch('/api/solicitar-consultoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            plano: 'personalizado',
            timestamp: new Date().toISOString()
        })
    });
    */
}

function obterDadosPlanos() {
    return planosData;
}




async function processarPagamento(plano) {
  // Aqui pega a opção selecionada (mensal ou trimestral) dentro do grupo do plano escolhido
  const radios = document.getElementsByName(`preco-${plano}`);
  let periodoSelecionado = null;

  for (const radio of radios) {
    if (radio.checked) {
      periodoSelecionado = radio.value; // "mensal" ou "trimestral"
      break;
    }
  }

  if (!periodoSelecionado) {
    alert("Escolha um período para o plano.");
    return;
  }

  try {
    // Chama o backend que gera o link seguro
    const response = await fetch('http://localhost:3000/gerar-link', { // substituir quando for para producao "ar"
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plano, periodo: periodoSelecionado })
    });

    if (!response.ok) throw new Error('Erro na resposta do servidor');

    const data = await response.json();

    if (data.sucesso && data.linkSeguro) {
      // Redireciona pra página segura gerada pelo backend
      window.location.href = data.linkSeguro;
    } else {
      alert("Não foi possível gerar o link de pagamento.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao processar pagamento. Tente novamente. servidor fora!");
  }
}