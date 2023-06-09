import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/orders';


/**
 * Submits the Order when given the items
 * 
 * @param {} items Gets needed variables from environment
 * @returns {json} Returns the response
 */
export async function submitOrderAsync(items) {
    const data = {
        items: items 
    };

    const response = await axios.post(API_ENDPOINT, data);
    
    console.log(response);
    if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
    }
    
    return response.data;
}