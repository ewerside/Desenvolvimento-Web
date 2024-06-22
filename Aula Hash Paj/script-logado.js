window.onload = function() {
    // Declare and initialize the mnsgSecreta variable
    var mnsgSecreta = document.getElementById('mnsgSecreta');
    
    // Verifica o valor no armazenamento local
    if (localStorage.getItem('senhaCorreta') === 'true') {
        // Exibe a mensagem
        mnsgSecreta.innerHTML = 'Você está logado!';
    } else {
        mnsgSecreta.innerHTML = 'Não tente trapacear...';
    }
}

document.getElementById('btn-sair').onclick = () => {
    localStorage.removeItem('senhaCorreta');
    window.location.href = 'index.html';
}