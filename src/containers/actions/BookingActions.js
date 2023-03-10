import { SERVER_URI } from "./Settings"

const config = {
    headers: {
        Accept: '*/*',
        // 'Content-Type': 'multipart/form-data'
    }
}

const fetchCall = (object) => { 
    return fetch(`${SERVER_URI}/bookings/${object.api}`, {
        method: object.method,
        headers: config.headers,
        body: object.formData
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        return error
    });
}


export const addBooking = formData => {
    const data = { api: 'add-booking', method: 'POST', formData };
    return fetchCall(data);
}


export const getBookingById = formData => {
    const data = { api: `get-booking/${formData.bookingId}`, method: 'GET' };
    return fetchCall(data);
}


export const getAllBookings = formData => {
    const data = { api: 'get-bookings', method: 'GET', formData };
    return fetchCall(data);
}


export const updateBookingById = (formData, id) => {
    const data = { api: `update-booking/${id}`, method: 'POST', formData };
    return fetchCall(data);
}

export const deleteBookingById = id => {
    const data = { api: `delete-booking/${id}`, method: 'DELETE' };
    return fetchCall(data);
}

