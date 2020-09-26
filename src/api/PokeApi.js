import axios from 'axios';
import { sampleSize } from 'lodash';


const api  = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

let db = [];

const getAllPokemons = async () => {
    const res = await api.get('/pokemon', {
        params: {
            limit: 150
        }
    })

    db = res.data.results.map((poke, index) => {
        let imageFileName = `00${ index + 1 }`.slice(-3);

        return {
            id: poke.name,
            value: poke.name,
            image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ imageFileName }.png`
        }
    });
}

const getPokemons = async () => {
    if (db.length === 0) {
        await getAllPokemons();
    }
    return sampleSize(db, 8);
}

const PokeApi = {
    list: getPokemons
};

export default PokeApi;
