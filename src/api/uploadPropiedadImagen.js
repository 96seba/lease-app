import { API_HOST } from '../utils/constants'

export async function uploadPropiedadImagen(form) {
    try {
        const response = await fetch(API_HOST + '/api/v1/property/uploadImage',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
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
