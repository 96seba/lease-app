import { API_HOST } from '../utils/constants'

export async function getAllUsers() {
    try {
        const response = await fetch(API_HOST + '/api/v1/users',
            { method: 'GET', })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}