import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak();

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param {Function} onAuthenticatedCallback - The callback function to be called if authentication is successful.
 */
const Login = (onAuthenticatedCallback: Function) => {
  keycloakInstance
    .init({ onLoad: "login-required" })
    .then((authenticated: boolean) => {
      authenticated ? onAuthenticatedCallback() : alert("non authenticated");
    })
    .catch((e: Error) => {
      console.dir(e);
      console.log(`keycloak init exception: ${e}`);
    });
};

const UserName = () => keycloakInstance.tokenParsed?.preffered_username;

const Logout = keycloakInstance.logout;

const KeyCloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  CallLogout: Logout,
};

export default KeyCloakService;
