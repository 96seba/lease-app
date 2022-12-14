import { API_HOST, TOKEN } from '../utils/constants'

export async function getLeaseholder() {
    try {
        const response = await fetch(API_HOST + '/api/v1/leaseholders/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                }
            })
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}