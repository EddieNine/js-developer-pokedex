const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 60; /* Reduzi o número para 60 para facilitar a demonstração.
Possui mais de 1000 pokémons */
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const primaryType = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[primaryType];

    card.style.backgroundColor = color;

    const height = poke.height / 10; // Converte a altura para metros
    const weight = poke.weight / 10; // Converte o peso para kg

    const secondaryTypes = pokeTypes.filter(type => type !== primaryType);

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
        alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo primário: <span>${primaryType}</span></small><br>
        ${secondaryTypes.length > 0 ? `<small class="type">Tipo secundário: <span>${secondaryTypes.join(', ')}</span></small>` : ''}<br>
        <small class="height">Altura: <span>${height} m</span></small><br>
        <small class="weight">Peso: <span>${weight} kg</span></small>
    </div>`;

    card.innerHTML = pokemonInnerHTML;

    card.addEventListener("mouseover", () => {
        showCardInfo(card);
    });

    card.addEventListener("mouseout", () => {
        hideCardInfo(card);
    });

    pokeContainer.appendChild(card);
}

function showCardInfo(card) {
    const info = card.querySelector(".info");
    info.style.display = "block";
}

function hideCardInfo(card) {
    const info = card.querySelector(".info");
    info.style.display = "none";
}

fetchPokemons();
