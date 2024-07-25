const grid = document.querySelector('.grid');
const monsters = [
    'Firewall_Dragon',
    'Dark Magician the Magician of Black Magic',
    'Rciela, Sinister Soul of the White Forest',
    'Rekindling the Ashened',
    'Azamina Sol Erysichthon',
    'Number F0 Utopic Future Dragon',
    'Elemental HERO Solidman',
    'Poseidra Abyss, the Atlantean Dragon Deity',
    'Ultimate Dragon of Pride and Soul',
    'Raizeol Deadnader',
];

let firstCard = null;
let secondCard = null;

const revealCard = (event) => {
    const target = event.target.parentNode;

    // Verificar se a carta já está revelada ou se já foram escolhidas duas cartas
    if (target.classList.contains('reveal-card') || secondCard !== null) {
        return;
    }

    target.classList.add('reveal-card');

    // Definir a primeira ou segunda carta virada
    if (firstCard === null) {
        firstCard = target;
    } else {
        secondCard = target;
        checkCards();
    }
};

const checkCards = () => {
    if (firstCard && secondCard) {
        // Comparar os monstros das duas cartas
        const monster1 = firstCard.querySelector('.face.front').style.backgroundImage;
        const monster2 = secondCard.querySelector('.face.front').style.backgroundImage;

        if (monster1 === monster2) {
            // Se forem iguais, manter as cartas reveladas
            firstCard = null;
            secondCard = null;
        } else {
            // Se forem diferentes, esconder as cartas após um curto intervalo
            setTimeout(() => {
                firstCard.classList.remove('reveal-card');
                secondCard.classList.remove('reveal-card');
                firstCard = null;
                secondCard = null;
            }, 500);
        }
    }
};

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const createCard = (monster) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url("../Cards/${monster}.jpg")`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    return card;
};

const loadGame = () => {
    // Duplicar o array de monstros
    const duplicateMonsters = monsters.concat(monsters);

    // Embaralhar o array
    duplicateMonsters.sort(() => Math.random() - 0.5);

    // Criar cartões e adicionar ao grid
    duplicateMonsters.forEach((monster) => {
        const card = createCard(monster);
        grid.appendChild(card);
    });
};

loadGame();
