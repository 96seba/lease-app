import { API_HOST } from '../utils/constants'

export async function createPropiedad(body) {
    try {
        const response = await fetch(API_HOST + '/api/v1/property/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZXBydWViYSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTY2NzU4OTg3M30.Cchhyl-pRCUI2A6jzkLJDZ3i-rSEBhcGZE5OeizzXF8'
                },
                body: JSON.stringify(body)
            })
        const result = await response.json();
        var obj = { status: response.status, data: result.data }
        return obj
    } catch (error) {
        throw error;
    }
}
