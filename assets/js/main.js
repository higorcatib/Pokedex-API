const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0




function loadPokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <a href="pokemon.html?id=${pokemon.name}"> <!-- Link para a página de detalhes -->
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            </a>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('');
        pokemonList.innerHTML += newHTML;
    });
}



loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordNexpage = offset + limit

    if(qtdRecordNexpage >= maxRecords){
        const newLimt = maxRecords - offset
        loadPokemons(offset, newLimt)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    }else{
        loadPokemons(offset, limit)
    }






    
})