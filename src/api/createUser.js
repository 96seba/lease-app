import {API_HOST} from '../utils/constants'

export async function createUser(email,password) {
    try {
        const url = `${API_HOST + "/api/v1/user/create"}`;
        const response = await fetch(url, {
            method: 'POST',
            body: {
                "email":email,
                "password":password
            },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZXBydWViYSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY2NzU4NjYwM30.am1CTA50fmK_M_eQw97JIk1KPUC_k2bKhVLzBnpqwvw` ,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result
    } catch (error) {
        throw error;
    }
}
