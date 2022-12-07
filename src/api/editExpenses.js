import { API_HOST, TOKEN } from '../utils/constants'

export async function editExpenses(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/expense/states',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                },
                body: JSON.stringify(body)
            })
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        console.log(result)
        return obj
    } catch (error) {
        throw error;
    }
}
