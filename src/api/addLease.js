import { API_HOST, TOKEN } from '../utils/constants'

export async function addLease(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/lease/create',
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