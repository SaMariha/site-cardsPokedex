
const limit = 30
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;



const pokeApi={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id;
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

const stats = pokeDetail.stats.map((statBaseStat) => ({
    name: statBaseStat.stat.name,
    value: statBaseStat.base_stat,
}));

const [type] = types;

pokemon.types = types;
pokemon.type = type;
pokemon.stats = stats;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) =>{
        return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


function convertPokemonToHtml(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <img src="${pokemon.photo}" alt="${pokemon.name}">

        <div class="perfil">
        <span class="habilidades"> HABILIADES </span>
                <ol class="stats">
                    ${pokemon.stats.map((stat) => `<li class="stat ${stat.name}">${stat.name}: ${stat.value}</li>`).join('')}
                </ol>
        </div>
    </li>`;
}

const pokemonList = document.getElementById('pokemonList')

fetch(url)
   

    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => Promise.all(pokemons.map(pokeApi.getPokemonDetail))) // Use Promise.all para realizar todas as chamadas de detalhes de uma vez
    .then(pokemonsDetails => {
        for (const detail of pokemonsDetails) {
            pokemonList.innerHTML += convertPokemonToHtml(detail);
        }
    })
    .catch(error => {
        console.log(error);
    });