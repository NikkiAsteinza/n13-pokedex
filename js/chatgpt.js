let offset = 0;
let loading = false;
const limit = 20;  // Number of Pokémon to load per request

function loadPokemon(offset, limit) {
    loading = true;
    document.getElementById('loading').style.display = 'block';

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            data.results.forEach(pokemon => {
                // Fetch detailed information for each Pokémon
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(details => {
                        const div = document.createElement('div');
                        div.className = 'pokemon-card';

                        // Create an image element
                        const img = document.createElement('img');
                        img.src = details.sprites.front_default;  // Default front image of the Pokémon
                        img.alt = pokemon.name;
                        
                        // Capitalize the first letter of the Pokémon name
                        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

                        // Append image and name to the div
                        div.appendChild(img);
                        div.appendChild(document.createTextNode(name));

                        // Append the div to the container
                        container.appendChild(div);
                    })
                    .catch(error => {
                        console.error('Error fetching Pokémon details:', error);
                    });
            });
            loading = false;
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loading = false;
            document.getElementById('loading').style.display = 'none';
        });
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !loading) {
        offset += limit;
        loadPokemon(offset, limit);
    }
});

// Load the first set of Pokémon
loadPokemon(offset, limit);
