import axios from "axios";
import auth0Info from '/src/api.json'


export async function getMaps() {


    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    var token = ""

    await axios.post('https://maps.googleapis.com/maps/api/js?key=AIzaSyAGASGsdwG6Q7PchfqpxzCqDbZzVVttzOM')
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