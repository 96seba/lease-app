import { API_HOST, TOKEN } from '../utils/constants'

export async function getExpensesPerDay() {
    try {
        const response = await fetch(API_HOST + '/api/v1/expenses/expensesForDay/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + TOKEN
                }
            })
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}