import axios from "axios";

const API_ENDPOINT = "https://pomandhoneyapi.azurewebsites.net";

export async function getInventory() {
  const response = await axios.get(API_ENDPOINT + "/inventory");
  console.log(response.data);
  return response;
}

export async function InventoryAdd(name, category, price, quantity) {
  if (category == 'Cutlery') {
    const response = await axios.post(API_ENDPOINT + "/cutlery/", {
      "name": name.toLowerCase(),
      "quantity": quantity
  });
    console.log(response.data);
    return response;
  }
  else{
    const response = await axios.post(API_ENDPOINT + "/menu-item", {
      "name": name.toLowerCase(),
      "category": category.toLowerCase(),
      "price": price,
      "quantity": quantity,
      "cutlery": []
    });

    console.log(response.data);
    return response;
  }
}

export async function InventoryEdit(name, attribute, value, item) {

  if (item.type == 'cutlery') {
    if (attribute == "Quantity") {
      const response = await axios.put(API_ENDPOINT + "/cutlery", {
        "name": name.toLowerCase(),
        "quantity": value
      });

      console.log(response.data);
      return response;
    }
    else {
      alert("You can only edit the quantity of cutlery.")
      window.location.reload()
    }
  }
  else{

    switch (attribute) {
      case "Category":
        item.type = value.toLowerCase()
        break;
        
      case "Price":
        item.price = value
        break;

      case "Quantity":
        item.quantity = value
        break;

      default:
        break;
    }

    const response = await axios.put(API_ENDPOINT + "/menu-item/" + name, {
      "name": name,
      "category": item.type,
      "price": item.price,
      "quantity": item.quantity,
      "cutlery": []
    });
  }
}

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
