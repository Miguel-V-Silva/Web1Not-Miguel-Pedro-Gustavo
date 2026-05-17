fetch('../html/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
        carregarUsuario();
        fetch('../html/footer.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('footer').innerHTML = data;

                configurarNavbar();
            });
    });

function carregarUsuario() {
    const usuario = sessionStorage.getItem("usuario");
    const nomeEl = document.getElementById("nome-usuario");

    if (!nomeEl) return;

    nomeEl.innerText = usuario || "Visitante";
}

function configurarNavbar() {

    const navAdicionar = document.getElementById('nav-adicionar');
    const navListar = document.getElementById('nav-listar');
    const navLogin = document.getElementById('nav-login');
    const navSobre = document.getElementById('nav-sobre');

    const paginaAtual = window.location.pathname;

    // limpa classes
    document.querySelectorAll('.nav-link')
        .forEach(el => el.classList.remove('active'));

    if (paginaAtual.includes('home')) {

        if (navAdicionar) {
            navAdicionar.classList.add('active');
        }
    }

    if (paginaAtual.includes('sobre')) {

        if (navSobre) {
            navSobre.classList.add('active');
        }
    }

    if (navLogin) {
        navLogin.addEventListener('click', () => {
            window.location.href = '../html/login.html';
        });
    }

    if (navSobre) {
        navSobre.addEventListener('click', () => {
            window.location.href = '../html/sobre.html';
        });
    }

    if (navAdicionar) {

        navAdicionar.addEventListener('click', () => {

            // Se estiver fora da home
            if (!paginaAtual.includes('home')) {

                window.location.href = '../html/home.html?section=forms';

            } else {

                // já está na home
                const formsSection = document.getElementById('forms-section');
                const tableSection = document.getElementById('table-section');

                if (formsSection && tableSection) {

                    formsSection.style.display = 'flex';
                    tableSection.style.display = 'none';
                }

                navAdicionar.classList.add('active');
                navListar?.classList.remove('active');
            }
        });
    }

    if (navListar) {

        navListar.addEventListener('click', () => {

            // Se estiver fora da home
            if (!paginaAtual.includes('home')) {

                window.location.href = '../html/home.html?section=table';

            } else {

                // já está na home
                const formsSection = document.getElementById('forms-section');
                const tableSection = document.getElementById('table-section');

                if (formsSection && tableSection) {

                    formsSection.style.display = 'none';
                    tableSection.style.display = 'block';
                }

                navListar.classList.add('active');
                navAdicionar?.classList.remove('active');
            }
        });
    }
}