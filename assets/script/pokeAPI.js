const pokeAPI = {}

function convertPokeDataToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.order = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type1, type2, type3 ] = types;
  pokemon.types = types;
  pokemon.type = type1;
  pokemon.image = pokeDetail.sprites.other.home.front_default;
  return pokemon;
}

pokeAPI.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
  .then((details) => details.json())
  .then(convertPokeDataToPokemon)
}

pokeAPI.getPokemon = (offset = 0, limit = 16) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
  .then((res) => res.json())
  .then((resBodyJson) => resBodyJson.results)
  .then((pokemons) => pokemons.map((pokeAPI.getPokemonDetails)))
  .then((detailsReq) => Promise.all(detailsReq))
  .then((pokemonsDetails) => pokemonsDetails)
}