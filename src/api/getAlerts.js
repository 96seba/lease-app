import { API_HOST } from '../utils/constants'

export async function getAlerts() {
    try {
        const response = await fetch(API_HOST + '/api/v1/property/1/alerts',
            { method: 'GET', })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}

