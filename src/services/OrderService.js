import axios from "axios";

const API_ENDPOINT = 'https://pomandhoneyapi.azurewebsites.net/orders';

export async function submitOrderAsync(menuItems) {
    const data = {
        items: ["brown rice", "falafel", "drink", "tomato", "tahini"]
    };

    fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }) 
    .catch(error => {
        console.error(error);
    });
}