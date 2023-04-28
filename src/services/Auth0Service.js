import axios from "axios";


export async function getAccessToken() {
    const data = {
      client_id: 'LpuYMFqjt56iHU3vu36QSKKErHdT2K2W',
      client_secret: '-s7h0eyt2LfOff9Q2WLpOkT5kmUlrhHN16Woqwn3JfxfxHXxKI0MajJ1G2Ct0SxN',
      audience: 'https://dev-myn5wum5n16axxbc.us.auth0.com/api/v2/',
      grant_type: 'client_credentials'
    };

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    var token = ""

    await axios.post('https://dev-myn5wum5n16axxbc.us.auth0.com/oauth/token', data, config)
      .then(response => {
        //console.log(response.data);
        token = response.data.access_token;
      })
      .catch(error => {
        console.error(error);
        console.log("error")
      });

    return token
  }