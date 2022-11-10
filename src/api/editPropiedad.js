import { API_HOST, TOKEN } from '../utils/constants'

export async function editPropiedad(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/property/update',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
                body: JSON.stringify(body)
            })
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}
