import axios from "axios";

const API_URL = "https://django-crud-iqre.onrender.com/api/items/";

export const getItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItem = async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await axios.put(`${API_URL}${id}/`, item);
    return response.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
};
