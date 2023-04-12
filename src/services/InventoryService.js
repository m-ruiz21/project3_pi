import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/inventory';

export async function getInventory() {
    const response = await axios.get(API_ENDPOINT);
    console.log(response.data);
    return await response;
}