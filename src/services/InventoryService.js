import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/inventory';

export async function getInventory() {
    const response = await axios.get(API_ENDPOINT);
    console.log(response.data);
    return await response;
}

export async function InventoryRemove(item) {
    const response = await axios.delete(API_ENDPOINT + "?name=" + item + "&type=menu-item");
    console.log(item);
    console.log(response.data);
    return await response;
}