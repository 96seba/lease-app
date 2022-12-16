import { API_HOST, TOKEN } from '../utils/constants'

export async function getVisitsForProperty(id) {
    try {
        const response = await fetch(API_HOST + '/api/v1/visit/forProperty/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
            })
        const result = await response.json();
        return result.data
    } catch (error) {
        throw error;
    }
}

