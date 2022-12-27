import { API_HOST, TOKEN } from '../utils/constants'

export async function sendDebtorMail(id) {
    try {
        const response = await fetch(API_HOST + '/api/v1/expense/debtor/sendEmail',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
