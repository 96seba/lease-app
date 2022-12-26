import { API_HOST, TOKEN } from '../utils/constants'

export async function sendTicket(id) {
    try {
        const response = await fetch(API_HOST + '/api/v1/admin_exp/sendSpecificTicket/' + id,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + TOKEN
                }
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
