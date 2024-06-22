console.log("Todos os nomes \n --------------------------");

atletasfeminino.forEach(
    (e) => {
        console.log(e.nome_completo);
    }
);

console.log("Todas as alturas \n ------------------------");

let count = 0;
while (atletasfeminino.length > count) {
    console.log(`${atletasfeminino[count].nome}:`, atletasfeminino[count].altura);
    count++;
}

console.log("Todas as posições \n ------------------------");

for (let count1 = 0; count1 < atletasfeminino.length; count1++) {
    console.log(`${atletasfeminino[count1].nome}: ${atletasfeminino[count1].posicao}`);
}

console.log("Todas as descrições \n ------------------------");

for (let about of atletasfeminino) {
    console.log(`${about.nome}: ${about.descricao}`);
}

const container = document.getElementById('container');

atletasfeminino.forEach(jogadora => {
    container.innerHTML += `
        <div class='Card'>
            <img src="${jogadora.imagem}" alt="${jogadora.nome}">
            <section>
                <p>${jogadora.posicao}</p>
                <h1>${jogadora.nome}</h1>
            </section>
            <p>${jogadora.descricao}</p>
            <footer>${jogadora.nascimento}</footer>
            <p>Equipe: ${jogadora.elenco} | Altura: ${jogadora.altura}</p>
        </div>
    `;
});
