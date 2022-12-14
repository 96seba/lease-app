import { API_HOST, TOKEN } from '../utils/constants'

export async function createUser(obj) {
    try {
        const response = await fetch(API_HOST + '/api/v1/user/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
                body: JSON.stringify(obj)
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
