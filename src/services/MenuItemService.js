import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/menu-item';

export async function getAllMenuItems() {
    const response = await axios.get(API_ENDPOINT);
    console.log(response.data);
    return await response;
}

export async function getMenuItemByName(name) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${name}`);
    console.log(response.data);
    return response;
  } catch (error) {
      console.error(`Error: ${error}`);
      console.log(error.response);
      throw error;
  }
}
