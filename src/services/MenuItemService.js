import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/menu-item';

export async function getAllMenuItems() {
    const response = await axios.get(API_ENDPOINT);
    console.log(response.data);
    return await response;
}