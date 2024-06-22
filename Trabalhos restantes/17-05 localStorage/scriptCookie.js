const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name));
    return cookie?.split("=")[1];
};

// Função antiga de obtenção de cookies
// const getCookieOld = (name) => {
//     let cookieValue = "";
//     const cookies = document.cookie.split(';');
//     cookies.forEach(cookie => {
//         if (cookie.includes(name)) {
//             cookieValue = cookie.split('=')[1];
//         }
//     });
//     return cookieValue;
// };

const renderCard = (athlete) => {
    const card = document.createElement('article');
    card.style.backgroundColor = 'white';
    card.style.display = 'grid';
    card.style.width = 'fit-content';
    card.style.padding = '1rem';
    card.style.position = 'absolute';
    card.style.top = '50%';
    card.style.left = '50%';
    card.style.transform = 'translate(-50%, -50%)';
    card.style.border = '2px solid black';
    card.style.borderRadius = '10px';
    card.style.gridTemplateColumns = '12rem 22rem';
    card.style.gridTemplateAreas = "'img info' 'desc desc' 'birth birth' 'extra extra'";

    const img = document.createElement('img');
    img.style.gridArea = 'img';
    img.style.height = '9rem';
    img.style.width = '9rem';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    img.style.objectPosition = 'top';
    img.src = athlete.imagem;
    img.alt = athlete.nome;

    const info = document.createElement('section');
    info.style.gridArea = 'info';
    info.style.display = 'flex';
    info.style.flexDirection = 'column';
    info.style.alignItems = 'center';
    info.style.justifyContent = 'center';

    const pos = document.createElement('p');
    pos.style.fontWeight = 'bold';
    pos.style.fontFamily = 'sans-serif';
    pos.style.fontSize = '1rem';
    pos.style.textTransform = 'uppercase';
    pos.innerHTML = athlete.posicao;

    const name = document.createElement('p');
    name.style.fontWeight = 'bold';
    name.style.fontFamily = 'sans-serif';
    name.style.fontSize = '1.3rem';
    name.style.textTransform = 'uppercase';
    name.innerHTML = athlete.nome;

    const description = document.createElement('p');
    description.style.gridArea = 'desc';
    description.innerHTML = athlete.descricao;

    const birth = document.createElement('p');
    birth.style.gridArea = 'birth';
    birth.innerHTML = athlete.nascimento;

    const extra = document.createElement('p');
    extra.innerHTML = `Elenco: ${athlete.elenco} | Altura: ${athlete.altura}`;
    extra.style.gridArea = 'extra';

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(pos);
    info.appendChild(name);
    card.appendChild(description);
    card.appendChild(birth);
    card.appendChild(extra);

    document.body.appendChild(card);

    // Teste com card extra
    // const cardExtra = document.createElement('div');
    // cardExtra.style.backgroundColor = 'lightgray';
    // cardExtra.style.padding = '1rem';
    // card.appendChild(cardExtra);
};

const urlParams = new URLSearchParams(window.location.search);

// Tentativa de usar localStorage ao invés de cookies
// const athlete = JSON.parse(localStorage.getItem('atletaDados'));

const athlete = {};
athlete.nome = getCookieValue('nomeCompleto');
athlete.posicao = getCookieValue('posicao');
athlete.imagem = getCookieValue('imagem');
athlete.descricao = getCookieValue('descricao');
athlete.nascimento = getCookieValue('nascimento');

const athleteFromLocalStorage = JSON.parse(localStorage.getItem('atleta'));

athlete.elenco = urlParams.get('elenco');
athlete.altura = urlParams.get('altura');

renderCard(athlete);

// Código alternativo para renderizar card do localStorage
// renderCard(athleteFromLocalStorage);
