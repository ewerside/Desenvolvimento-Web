const apiEndpoint = 'https://botafogo-atletas.mange.li/all';
let playersList;

// cria o container principal
const mainDiv = document.createElement('div');
mainDiv.style.display = 'flex';
mainDiv.style.flexWrap = 'wrap';
mainDiv.style.gap = '1rem';
mainDiv.style.justifyContent = 'space-around';

// coloca o escudo do time
const logoImg = document.createElement('img');
logoImg.src = 'midias/BOTAFOGO.png';

// tenta usar outro logo
// logoImg.src = 'midias/LOGO_ALTERNATIVO.png';

const logoDiv = document.createElement('div');
logoDiv.style.display = 'flex';
logoDiv.style.width = '6rem';
logoDiv.style.height = '6rem';
logoDiv.appendChild(logoImg);

// barra de busca
// const searchDiv = document.createElement('div');
// searchDiv.style.textAlign = 'center';
// searchDiv.style.marginTop = '20px';
// searchDiv.style.padding = '1rem';

// const searchInput = document.createElement('input');
// searchInput.type = 'text';
// searchInput.style.borderRadius = '12px';
// searchInput.placeholder = 'Buscar jogadores...';
// searchDiv.appendChild(searchInput);

const headerDiv = document.createElement('div');
headerDiv.append(logoDiv);
// headerDiv.append(searchDiv);
headerDiv.style.backgroundColor = 'darkgrey';
headerDiv.style.borderRadius = '0 0 12px 12px';
headerDiv.style.display = 'flex';
headerDiv.style.justifyContent = 'space-between';
headerDiv.style.marginTop = '0';
headerDiv.style.marginBottom = '10px';

document.body.appendChild(headerDiv);
document.body.appendChild(mainDiv);

// função pra criar card
const createCard = (player) => {
    const cardDiv = document.createElement('article');
    cardDiv.style.backgroundColor = 'white';
    cardDiv.style.display = 'grid';
    cardDiv.style.width = 'fit-content';
    cardDiv.style.padding = '1rem';
    cardDiv.style.border = '2px solid grey';
    cardDiv.style.borderRadius = '12px';
    cardDiv.style.gridTemplateColumns = '12rem 22rem';
    cardDiv.style.gridTemplateAreas = "'img info' 'desc desc' 'birth birth'";

    const playerImg = document.createElement('img');
    playerImg.style.gridArea = 'img';
    playerImg.style.height = '9rem';
    playerImg.style.width = '9rem';
    playerImg.style.objectFit = 'cover';
    playerImg.style.borderRadius = '50%';
    playerImg.style.objectPosition = 'top';
    playerImg.src = player.imagem;
    playerImg.alt = player.nome;

    // tentando outra formatação pra imagem
    // playerImg.style.borderRadius = '10%';

    const infoSection = document.createElement('section');
    infoSection.style.gridArea = 'info';
    infoSection.style.display = 'flex';
    infoSection.style.flexDirection = 'column';
    infoSection.style.alignItems = 'center';
    infoSection.style.justifyContent = 'center';

    const posText = document.createElement('p');
    posText.style.fontWeight = 'bold';
    posText.style.fontFamily = 'Arial, sans-serif';
    posText.style.fontSize = '1.2rem';
    posText.style.textTransform = 'uppercase';
    posText.innerHTML = player.posicao;

    const nameText = document.createElement('p');
    nameText.style.fontWeight = 'bold';
    nameText.style.fontFamily = 'Arial, sans-serif';
    nameText.style.fontSize = '1.5rem';
    nameText.style.textTransform = 'uppercase';
    nameText.innerHTML = player.nome;

    const descText = document.createElement('p');
    descText.style.gridArea = 'desc';
    descText.innerHTML = player.descricao;
    descText.style.overflow = 'hidden';
    descText.style.whiteSpace = 'nowrap';
    descText.style.textOverflow = 'ellipsis';

    // teste pra esconder a descrição
    // descText.style.display = 'none';

    const birthText = document.createElement('p');
    birthText.style.gridArea = 'birth';
    birthText.innerHTML = player.nascimento;

    cardDiv.appendChild(playerImg);
    cardDiv.appendChild(infoSection);
    infoSection.appendChild(posText);
    infoSection.appendChild(nameText);
    cardDiv.appendChild(descText);
    cardDiv.appendChild(birthText);

    mainDiv.appendChild(cardDiv);

    // adiciona mais info no card
    // const extraInfo = document.createElement('p');
    // extraInfo.style.gridArea = 'extra';
    // extraInfo.innerHTML = `Elenco: ${player.elenco} | Altura: ${player.altura}`;
    // cardDiv.appendChild(extraInfo);

    cardDiv.onclick = (e) => {
        const data = cardDiv.dataset;

        for (const key in data) {
            document.cookie = `${key}=${data[key]}`;
        }

        localStorage.setItem('player', JSON.stringify(data));
        window.location.href = `detalhes.html?altura=${data.altura}&elenco=${data.elenco}`;
    };

    cardDiv.dataset.id = player.id;
    cardDiv.dataset.descricao = player.descricao;
    cardDiv.dataset.nome = player.nome;
    cardDiv.dataset.nomeCompleto = player.nome_completo;
    cardDiv.dataset.posicao = player.posicao;
    cardDiv.dataset.imagem = player.imagem;
    cardDiv.dataset.elenco = player.elenco;
    cardDiv.dataset.nascimento = player.nascimento;
    cardDiv.dataset.altura = player.altura;
};

// pesquisa por posição
// searchInput.onkeyup = (event) => {
//     const searchValue = event.target.value;
//     const filteredResults = playersList.filter(
//         (item) => item.posicao.toLowerCase().includes(searchValue.toLowerCase())
//     );

//     mainDiv.innerHTML = '';
//     filteredResults.forEach((player) => {
//         createCard(player);
//     });

//     // usando outro método de filtragem
//     // const altFilteredResults = playersList.filter(
//     //     (item) => item.nome.toLowerCase().includes(searchValue.toLowerCase())
//     // );
// };

mainDiv.innerHTML = `
    <div style='text-align: center'>
        <img src='midias/loading.gif'/>
    </div>
`;

// pega dados da API
const fetchData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// usar fetchData com .then() ao invés de await
fetchData(apiEndpoint).then((data) => {
    mainDiv.innerHTML = '';
    playersList = data;
    data.forEach((player) => {
        createCard(player);
    });
});

// código antigo pra pegar dados
// fetch(apiEndpoint)
//     .then(response => response.json())
//     .then(data => {
//         mainDiv.innerHTML = '';
//         playersList = data;
//         data.forEach(player => {
//             createCard(player);
//         });
//     });
