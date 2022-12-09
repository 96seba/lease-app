import { API_HOST, TOKEN } from '../utils/constants'

export async function updateUser(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/user/update',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + TOKEN,
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}
