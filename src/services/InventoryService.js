import axios from "axios";

const API_ENDPOINT = "https://pomandhoneyapi.azurewebsites.net";


/**
 * Gets Inventory
 * 
 * @param {none} None Gets needed variables from environment
 * @returns {json} Returns the response
 */
export async function getInventory() {
  const response = await axios.get(API_ENDPOINT + "/inventory");
  console.log(response.data);
  return response;
}

/**
 * Gets Inventory
 * 
 * @param {string} name name of the item being added
 * @param {string} category  category of the item being added
 * @param {double} price price of the item being added
 * @param {int} quantity the amount of the item being added
 * @returns {json} Returns the response
 */
export async function InventoryAdd(name, category, price, quantity) {
  if (category == 'Cutlery') {
    const response = await axios.post(API_ENDPOINT + "/cutlery/", {
      "name": name.toLowerCase(),
      "quantity": parseInt(quantity)
  });
    console.log(response.data);
    return response;
  }
  else{
    const response = await axios.post(API_ENDPOINT + "/menu-item", {
      "name": name.toLowerCase(),
      "category": category.toLowerCase(),
      "price": parseFloat(price),
      "quantity": parseInt(quantity),
      "cutlery": []
    });

    console.log(response.data);
    return response;
  }
}

/**
 * Edit Item information in Inventory
 * 
 * @param {string} name name of the item being edited
 * @param {string} attribute attriubute of the item being edited
 * @param {int} value value of the item being edited
 * @param {string} item edit the object storing the data
 * @returns {json} Returns the response 
 */
export async function InventoryEdit(name, attribute, value, item) {

  if (item.type == 'cutlery') {
    if (attribute == "Quantity") {
      const response = await axios.put(API_ENDPOINT + "/cutlery", {
        "name": name.toLowerCase(),
        "quantity": parseInt(value)
      });

      console.log(response.data);
      return response;
    }
    else {
      alert("You can only edit the quantity of cutlery.")
    }
  }
  else{

    switch (attribute) {
      case "Category":
        item.type = value.toLowerCase()
        break;
        
      case "Price":
        item.price = parseFloat(value)
        break;

      case "Quantity":
        item.quantity = parseInt(value)
        break;

      default:
        break;
    }

    console.log(item)

    const response = await axios.put(API_ENDPOINT + "/menu-item", {
      "name": name,
      "category": item.type,
      "price": item.price,
      "quantity": item.quantity,
      "cutlery": []
    });

    console.log(response.data);
    return response;
  }
}

/**
 * Remove Item in Inventory
 * 
 * @param {string} name name of the item being removed
 * @param {string} category category of the item being removed
 * @returns {json} Returns the response 
 */
export async function InventoryRemove(name, category) {

  if (category == 'cutlery') {
    const response = await axios.delete(API_ENDPOINT + "/cutlery/" + name);
    console.log(response.data);
    return response;
  }
  else{
    const response = await axios.delete(API_ENDPOINT + "/menu-item/" + name);
    console.log(response.data);
    return response;
  }
}
