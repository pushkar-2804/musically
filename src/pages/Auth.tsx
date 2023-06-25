import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initialize Keycloak instance
export const keycloak = new Keycloak({
  realm: "myrealm",
  url: "http://localhost:8080/",
  clientId: "myclient",
});

const Auth = () => {
  const nav = useNavigate();
  // State variables
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Function to initialize Keycloak and authenticate the user
  const initKeycloak = async () => {
    try {
      await keycloak.init({ onLoad: "login-required" });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication error", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) nav("/home");
    // if (keycloak.authenticated) nav("/home");
  }, [isAuthenticated, keycloak]);

  function onLoginButtonClick() {
    initKeycloak();
  }

  function logout() {
    keycloak.clearToken();
    keycloak.logout;
    setIsAuthenticated(false);
    nav("/");
  }

  return (
    <div>
      <button type="button" onClick={onLoginButtonClick}>
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Auth;
