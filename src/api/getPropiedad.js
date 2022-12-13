import { API_HOST, TOKEN } from '../utils/constants'

export async function getPropiedad(id) {
    try {
        const response = await fetch(API_HOST + '/api/v1/property/'+id,
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

