import axios from "axios";

const API_ENDPOINT = "https://pomandhoneyapi.azurewebsites.net/reports";

export async function getExcessReport() {
    const response = await axios.get(API_ENDPOINT + '/excess-report', {date: '2/14/23'});
    console.log(response.data);
    return await response;
  }

export async function getXReport() {
  const response = await axios.get(API_ENDPOINT + '/xreport');
  console.log(response.data);
  return await response;
}
