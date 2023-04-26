import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/menu-item';

export async function getAllMenuItems() {
    const response = await axios.get(API_ENDPOINT);
    console.log(response.data);
    return await response;
}

export async function getMenuItemByName(name, retries = 3) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${name}`);
    console.log(response.data);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.error(`Error: ${error}. Retrying ${retries} more times...`);
      console.log(error.response);
      await sleep(1000); // Wait for 1 second before retrying
      return await getMenuItemByName(name, retries - 1);
    } else {
      console.error(`Error: ${error}. No more retries left.`);
      throw error;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
