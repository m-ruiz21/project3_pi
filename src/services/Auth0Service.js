import axios from "axios";
import auth0Info from '/src/auth0.json'


export async function getAccessToken() {
    const data = {
      client_id: auth0Info.client_id,
      client_secret: auth0Info.client_secret,
      audience: auth0Info.audience,
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