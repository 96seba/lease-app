import { API_HOST, TOKEN } from '../utils/constants'

export async function getPropiedades() {
    try {
        const response = await fetch(API_HOST + '/api/v1/property',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
