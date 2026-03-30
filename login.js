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
    
    // salvar se checkbox marcado
    if (lembrar) {
        localStorage.setItem("login", login);
        localStorage.setItem("senha", senha);
        localStorage.setItem("lembrar", "true");
    } else {
        localStorage.removeItem("login");
        localStorage.removeItem("senha");
        localStorage.setItem("lembrar", "false");
    }
}

    window.onload = function() {
    var lembrar = localStorage.getItem("lembrar");

    if (lembrar === "true") {
        document.getElementById("input-id").value = localStorage.getItem("login");
        document.getElementById("input-password").value = localStorage.getItem("senha");
        document.getElementById("remember").checked = true;
    }
}