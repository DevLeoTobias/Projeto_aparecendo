

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const btnTopo = document.getElementById('btnTopo');

  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  };

  btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});

 //btn quero aparecer
const botaoComecar = document.getElementById('btnComecar');
botaoComecar.addEventListener('click', () => {
  document.getElementById('btnComecar').addEventListener('click', function () {
  document.querySelector('#planos').scrollIntoView({ behavior: 'smooth' });  
  botaoComecar.textContent = 'Aparecendo...';
        
    });
});

//contador de cliques do botao
        let contador = 0;
            botaoComecar.addEventListener('click', () => {
            contador++;
            console.log(`Botão clicado ${contador}x`);            
        });

//animacao do cards de planos
const cards = document.querySelectorAll('.plano-card');

cards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.style.borderColor = 'red';
  });
  card.addEventListener('mouseout', () => {
    card.style.borderColor = 'transparent';
  });
});

/* //Guardar a escolha de plano no localStorage
const botoesPlano = document.querySelectorAll('.btn-plano');

botoesPlano.forEach((botao) => {
  botao.addEventListener('click', () => {
    const nomePlano = botao.closest('.plano-card').querySelector('h3').textContent;
    localStorage.setItem('planoEscolhido', nomePlano);
    console.log(`Plano salvo: ${nomePlano}`);
    
  });
}); */

//btn para voltar ao top
const btnTopo = document.getElementById('btnTopo');

window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
