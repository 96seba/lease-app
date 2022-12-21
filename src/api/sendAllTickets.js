import { API_HOST, TOKEN } from '../utils/constants'

export async function sendAllTickets() {
    try {
        const response = await fetch(API_HOST + '/api/v1/admin_exp/sendAllTickets',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + TOKEN,
            }
        });
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}
