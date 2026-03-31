function iniciarJS(){
        
    //Criando as constantes para usar nas funcoes do JS
    const adicionarTarefaBotao = document.getElementById('add-task-btn');
    const tituloTarefaInput = document.getElementById('task-title');
    const descricaoTarefaInput = document.getElementById('task-description');
    const categoriaSelecionada = document.getElementById('category');
    const prioridadeRadios = document.querySelectorAll('input[name="task-priority"]');
    const tarefasTable = document.querySelector('#tasks-table tbody');

    const navListar = document.getElementById('nav-listar');
    const navAdicionar = document.getElementById('nav-adicionar');

    const formsSection = document.getElementById('forms-section');
    const tableSection = document.getElementById('table-section');

    //Variavel para dizer se esta sendo editado ou não
    let linhaEditada = null;



    //Recebe um argumento 'forms' ou 'table' onde se for 'forms' ele mostrará o formulario ou a tabela 
    function mostrarSessao(sessao) {
        formsSection.style.display = 'none';
        tableSection.style.display = 'none';

        if (sessao === 'forms') {
            formsSection.style.display = 'flex';
        } else if (sessao === 'table') {
            tableSection.style.display = 'block';
        }
    }

    navListar.addEventListener('click', () => mostrarSessao('table'));
    navAdicionar.addEventListener('click', () => mostrarSessao('forms'));
    
    //Por padrão ativa somente o forms como visiv
    mostrarSessao('forms');

    adicionarTarefaBotao.addEventListener('click', function(event) {
        event.preventDefault();

        //adiciona os valores dos inputs em variaveis
        const tituloTarefa = tituloTarefaInput.value.trim()
        const descricaoTarefa = descricaoTarefaInput.value.trim()
        const categoriaTarefa = categoriaSelecionada.value
        let prioridade = ''
        

        //Procura qual botão de prioridade foi selecionado
        for (const radio of prioridadeRadios) {
            if (radio.checked) {
                prioridade = radio.value;
                break
            }
        }

        if(!tituloTarefa || !descricaoTarefa || !categoriaTarefa || !prioridade){
            alert("Preencha todos os valores para adicionar a tarefa")
            return
        }

        if (linhaEditada) {

            linhaEditada.cells[0].textContent = tituloTarefa;
            linhaEditada.cells[1].textContent = descricaoTarefa;
            linhaEditada.cells[2].textContent = categoriaTarefa;
            linhaEditada.cells[3].textContent = prioridade;

            adicionarTarefaBotao.textContent = 'Adicionar Tarefa';
            linhaEditada.classList.remove('editing');
            linhaEditada = null;
        }else {
            const novaLinha = tarefasTable.insertRow();
            
            novaLinha.insertCell().textContent = tituloTarefa;
            novaLinha.insertCell().textContent = descricaoTarefa;
            novaLinha.insertCell().textContent = categoriaTarefa;
            novaLinha.insertCell().textContent = prioridade;
            

            const celulaAcoes  = novaLinha.insertCell();
            celulaAcoes.innerHTML = `
            <button id="edit-task-btn" class="functions-button-row">Editar</button>
            <button id="delete-task-btn" class="functions-button-row">Excluir</button>
            `;

            // Adiciona event listeners para os novos botões
            celulaAcoes.querySelector('#edit-task-btn').addEventListener('click', function() {
                editarTarefa(novaLinha);
            });
            celulaAcoes.querySelector('#delete-task-btn').addEventListener('click', function() {
                deletarTarefa(novaLinha);
            });
        }
        //Limpa o formulário após adicionar/editar
        alert('Tarefa Adicionada!')
        limparFormulario();
        mostrarSessao('table')
    });

    function editarTarefa(linha) {
        linhaEditada = linha;
        adicionarTarefaBotao.textContent = 'Salvar Alterações';

        linha.classList.add('editing');

        tituloTarefaInput.value = linha.cells[0].textContent;
        descricaoTarefaInput.value = linha.cells[1].textContent;
        categoriaSelecionada.value = linha.cells[2].textContent;

        const prioridadeAtual = linha.cells[3].textContent;
        for (const radio of prioridadeRadios) {
            if (radio.value === prioridadeAtual) {
                radio.checked = true;
                break;
            }
        }

        mostrarSessao('forms');
        tituloTarefaInput.focus();
    }
        function deletarTarefa(linha) {
        if (confirm('Deseja excluir esta tarefa?')) {
            linha.remove();
            if (editarLinha === linha) {
                limparFormulario();
                adicionarTarefaBotao.textContent = 'Adicionar Tarefa';
                editarLinha = null;
            }
        }
    }

    //função para limpar o formulario onde reseta todos os campos
    function limparFormulario() {
        tituloTarefaInput.value = '';
        descricaoTarefaInput.value = '';
        categoriaSelecionada.value = '';
        prioridadeRadios.forEach(radio => radio.checked = false);
        tituloTarefaInput.focus();
    }

    navAdicionar.addEventListener('click', function() {
        if (linhaEditada) {
            linhaEditada.classList.remove('editing'); // Remove o destaque da linha
            linhaEditada = null;
            adicionarTarefaBotao.textContent = 'Adicionar Tarefa';
            limparFormulario();
        }
        mostrarSessao('forms');
    });

    window.onload = function() {
    var usuario = localStorage.getItem("login");

    if (usuario) {
        document.getElementById("nome-usuario").innerText = usuario;
    } else {
        // se não tiver login, manda de volta
        window.location.href = "login.html";
    }
}

}
    
    fetch('../html/forms.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('forms-section').innerHTML = data;
        
        fetch('../html/table.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('table-section').innerHTML = data;
                
                fetch('../html/header.html')  
                .then(response => response.text())
                .then(data => {
                    document.querySelector('header').innerHTML = data;
                    iniciarJS()
                })
                .catch(error => console.error('Erro ao carregar header:', error));
            });
        
    })

    