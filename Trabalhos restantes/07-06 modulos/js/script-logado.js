let logado = false;

// Verifica se o usuário está logado
if (sessionStorage.getItem('logado')) {
    document.body.innerHTML = `
        <h1>Secreto...</h1>
        <button id='btn_sair'>Sair</button>
    `;
    document.getElementById('btn_sair').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = '/';
    }
}
