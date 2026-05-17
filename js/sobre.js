fetch('../html/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;

        // Fetch do Footer adicionado aqui
        fetch('../html/footer.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('footer').innerHTML = data;

                // Inicia o JS apenas quando tudo (forms, table, header e footer) estiver carregado
                iniciarJS();
            })
            .catch(error => console.error('Erro ao carregar footer:', error));

    })
    .catch(error => console.error('Erro ao carregar header:', error));