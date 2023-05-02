import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/menu-item';

/**
 * Gets all menuitems
 * 
 * @param {none} None Gets needed variables from environment
 * @returns {json} Returns the response
 */
export async function getAllMenuItems() {
    const response = await axios.get(API_ENDPOINT);
    return await response;
}

/**
 * Gets specified menuitem when given name
 * 
 * @param {string} name the name of the specific menuitem to be retrieved
 * @returns {json} Returns the response
 */
export async function getMenuItemByName(name) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${name}`);
    return response;
  } catch (error) {
      console.error(`Error: ${error}`);
      console.log(error.response);
      throw error;
  }
}

/**
 * Updates the menuitem
 * 
 * @param {string} menuItem the specific menuitem 
 * @returns {json} Returns the response
 */
export async function updateMenuItem(menuItem) {
  try {
    const response = await axios.put(API_ENDPOINT, menuItem);
    return response;
  } catch (error) {
      console.error(`Error: ${error}`);
      console.log(error.response);
      throw error;
  }
}
