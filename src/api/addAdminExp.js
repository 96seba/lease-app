import { API_HOST, TOKEN } from '../utils/constants'

export async function addAdminExp(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/admin_exp/addAdminExp',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
                body: JSON.stringify(body)
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
