import Keycloak from "keycloak-js";

// Initialize Keycloak instance
const keycloak = new Keycloak({
  url: "https://your-keycloak-url/auth",
  realm: "your-realm",
  clientId: "your-client-id",
});

// Function to initialize Keycloak and authenticate the user
async function initKeycloak() {
  try {
    await keycloak.init({ onLoad: "login-required" });
    console.log("Authenticated");
    // You can now redirect to the home screen or perform any other actions
  } catch (error) {
    console.error("Authentication error", error);
  }
}

// Call the initKeycloak function when the login button is clicked or on page load

// Example usage: Login button click event handler
function onLoginButtonClick() {
  initKeycloak();
}

const Auth = () => {
  return (
    <div>
      <button type="button" onClick={onLoginButtonClick}>
        Login
      </button>
    </div>
  );
};

export default Auth;
