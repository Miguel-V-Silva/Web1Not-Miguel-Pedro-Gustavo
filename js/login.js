    function verificarLogin(){
    var login = document.getElementById('input-id').value;
    var senha = document.getElementById('input-password').value;
    var lembrar = document.getElementById('remember').checked;

    if (login == "" || senha == "") {
        alert("O login e senha devem ser preenchidos.");
        return;
    }

    if (!login.includes("@") || !login.includes(".")) {
        alert("Login incorreto, deve seguir o modelo: example@example.com");
        return;
    }

    var nome = login.split("@")[0];
    
    const usuario = {
        nome: nome,
        email: login,
        senha: senha
    };

    sessionStorage.setItem("usuario", nome);
    // salvar se checkbox marcado
    if (lembrar) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("lembrar", "true");
    } else {
        localStorage.removeItem("usuario");
        localStorage.setItem("lembrar", "false");
    }

    window.location.href='../html/home.html'
}

    window.onload = function() {
        var lembrar = localStorage.getItem("lembrar");

        if (lembrar === "true") {
            var usuario = JSON.parse(localStorage.getItem("usuario"));

            if (usuario) {
                document.getElementById("input-id").value = usuario.email;
                document.getElementById("input-password").value = usuario.senha;
                document.getElementById("remember").checked = true;
            }
        }
    }
