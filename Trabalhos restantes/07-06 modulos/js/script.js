import { hex_sha512 } from "./sha512.js";

// Valor hash alvo e sal
const alvo = 'b54f7f878e1f0fe8bcf64032efc5ad7f00ed1a34b6961d87ab710db6dadccbd8cbabab14ac2de13545a6e3daa71a4ceac70be745402ed3b62e1c65b7ba17c2e5';
const sal = "um segredo salgado";
const mensagem = document.getElementById('mensagem');

document.getElementById('btn_enviar').onclick = () => {
    const senha = document.getElementById('senha').value;
    // Verifica se a senha inserida corresponde ao hash esperado
    if (hex_sha512(senha + sal) === alvo) {
        mensagem.innerHTML = 'Entrou!!!';
        sessionStorage.setItem('logado', '1');
        window.location.href = 'perfil.html';
    } else {
        mensagem.innerHTML = 'Senha incorreta';
    }
}

document.getElementById('btn_sair').onclick = () => {
    sessionStorage.removeItem('logado');
    mensagem.innerHTML = 'Saiu.';
}
