import axios from "axios";


export async function getAccessToken() {
    const data = {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      audience: import.meta.env.VITE_AUDIENCE,
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