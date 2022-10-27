import { pokeApi } from '../utils/constants'

export async function getPokemon(pokemon) {
    try {
        const url = `${pokeApi + "pokemon/" + pokemon}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
