import { API_HOST } from '../utils/constants'

export async function LoginUser(user, pass) {

    try {
        const url = `${API_HOST+"/api/v1/login"}`;
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': user,
                'password': pass
            })
        });
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}