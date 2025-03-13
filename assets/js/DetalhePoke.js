function getPokemonFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id'); // Isso pega o nome do Pokémon na URL, como 'bulbasaur'
}

function loadPokemonDetails(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(pokeDetail => {
      const pokemon = {
        number: pokeDetail.id,
        name: pokeDetail.name,
        photo: pokeDetail.sprites.other.dream_world.front_default,
        abilities: pokeDetail.abilities.map(ability => ability.ability.name), // Habilidades
        stats: pokeDetail.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat
        })) // Estatísticas (HP, Ataque, etc.)
      };

      // Exibindo os dados no HTML
      document.getElementById('pokemonName').textContent = pokemon.name;
      document.getElementById('pokemonNumber').textContent = `#${pokemon.number}`;
      document.getElementById('pokemonImage').src = pokemon.photo;

      // Exibindo as habilidades
      const abilitiesList = pokemon.abilities.map(ability => `<li>${ability}</li>`).join('');
      document.getElementById('pokemonAbilities').innerHTML = abilitiesList;

      // Exibindo as estatísticas
      const statsList = pokemon.stats.map(stat => `<li>${stat.name}: ${stat.base_stat}</li>`).join('');
      document.getElementById('pokemonStats').innerHTML = statsList;
    })
    .catch(error => {
      console.error('Erro ao buscar o Pokémon:', error);
    });
}

const pokemonName = getPokemonFromUrl();
if (pokemonName) {
  loadPokemonDetails(pokemonName);
}
