
import { API_HOST, TOKEN } from '../utils/constants'

export async function uploadTicket(form) {
    try {
        const response = await fetch(API_HOST + '/api/v1/admin_exp/uploadFile',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + TOKEN
                },
                body: form
            })
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}
