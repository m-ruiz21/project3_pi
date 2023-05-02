import { createApp } from "vue";
import App from "./App.vue";
import router from "/src/router.js";
import { createAuth0 } from "@auth0/auth0-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);

app.use(
  createAuth0({
    domain: "dev-myn5wum5n16axxbc.us.auth0.com",
    clientId: "5BIKNNvFrhvsly8JDSEjgAKh6GKu7qcz",
    useRefreshTokens: true,
    cacheLocation: "localstorage",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "https://dev-myn5wum5n16axxbc.us.auth0.com/api/v2/",
    },
  })
);

app.use(router);

app.mount("#app");
