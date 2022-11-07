const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMore');
let offset = 0;
const limit = 16;
const songBtn = document.getElementById('songBtn');


function getPokemon(pokemon){
  return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.order}</span>
        <h2 class="name">${pokemon.name}</h2>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.image}" alt="${pokemon.name}" height="120px">
        </div>
      </li>`
}

function loadMorePokemons(offset, limit){
  pokeAPI.getPokemon(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map(getPokemon).join('');
    pokemonList.innerHTML += newHTML;
  })
}

loadMorePokemons(offset, limit);

loadMoreBtn.addEventListener('click', () => {
  offset += limit;
  if(offset < 240){
    loadMorePokemons(offset, limit);
    songBtn.play();

  }else{
    loadMorePokemons(offset, 11);
    loadMoreBtn.style.display = 'none';
    songBtn.play();
  }
});