import axios from "axios";

const API_ENDPOINT = "https://pomandhoneyapi.azurewebsites.net/reports";


/**
 * Gets the Excess Report when called
 * 
 * @param {string} startTime user provides the start time to create the report 
 * @returns {json} Returns the response
 */
export async function getExcessReport(startTime) {
  const response = await axios.post(API_ENDPOINT + "/excess-report", {
    fromDate: startTime,
  });

  console.log(response.data);
  return response;
}


/**
 * Gets the Sales Report
 * 
 * @param {string} name the name of the menuitem to create report
 * @param {string} startDate user provides the start time to create the report 
 * @param {string} endDate provides the start time to create the report 
 * @returns {json} Returns the response
 */
export async function getSalesReport(name, startDate, endDate) {
  const response = await axios.post(API_ENDPOINT + "/sales-report", {
    startDate: startDate,
    endDate: endDate,
    menuItem: name,
  });
  console.log(response.data);
  return response;
}

/**
 * Gets the X report
 * 
 * 
 * @returns {json} Returns the response
 */
export async function getXReport() {
  const response = await axios.get(API_ENDPOINT + "/xreport");
  console.log(response.data);
  return response;
}

/**
 * Gets the Z report
 * 
 * 
 * @returns {json} Returns the response
 */
export async function getZReport() {
  const response = await axios.get(API_ENDPOINT + "/zreport");
  console.log(response.data);
  return response;
}

/**
 * Gets the Z report with page size limit
 * 
 * @param pageSize Pagination so the Z report is populated with a specified amount
 * @returns {json} Returns the response
 */
export async function getZReportWithSize(pageSize) {
  const response = await axios.get(API_ENDPOINT + "/zreport", {
    params: {
      pageNumber: 1,
      pageSize: pageSize,
    },
  });
  console.log(response.data);
  return response;
}

/**
 * Gets Orders 
 * 
 * @param pageNumber Pagination so the Orders are spaced across specified amount
 * @returns {json} Returns the response
 */
export async function getOrders(pageNumber) {
  const response = await axios.get(
    "https://pomandhoneyapi.azurewebsites.net/orders",
    {
      params: {
        pageNumber: pageNumber,
        pageSize: 50,
      },
    }
  );
  console.log(response.data);
  return response;
}

/**
 * Gets Orders that contain item that user provided with Id
 * 
 * @param Id Id of specific item 
 * @returns {json} Returns the response
 */
export async function getOrderByID(id) {
  const response = await axios.get(
    "https://pomandhoneyapi.azurewebsites.net/orders/" + id);
  console.log(response.data);
  return response;
}
