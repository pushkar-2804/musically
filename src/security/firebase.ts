// import Keycloak from "keycloak-js";

// const keycloakInstance = new Keycloak();

// /**
//  * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
//  *
//  * @param {Function} onAuthenticatedCallback - The callback function to be called if authentication is successful.
//  */
// const Login = (onAuthenticatedCallback: Function) => {
//   keycloakInstance
//     .init({ onLoad: "login-required" })
//     .then((authenticated: boolean) => {
//       authenticated ? onAuthenticatedCallback() : alert("non authenticated");
//     })
//     .catch((e: Error) => {
//       console.dir(e);
//       console.log(`keycloak init exception: ${e}`);
//     });
// };

// const UserName = () => keycloakInstance.tokenParsed?.preffered_username;

// const Logout = keycloakInstance.logout;

// const KeyCloakService = {
//   CallLogin: Login,
//   GetUserName: UserName,
//   CallLogout: Logout
// };

// export default KeyCloakService;
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// t to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFKyEPq1pyRbe1xb59VG61PYSUcY1vmCE",
  authDomain: "musically-f245b.firebaseapp.com",
  projectId: "musically-f245b",
  storageBucket: "musically-f245b.appspot.com",
  messagingSenderId: "780943791499",
  appId: "1:780943791499:web:e6397ce4778c9a9554cb8e",
  measurementId: "G-YJDHVQ3YZX",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the authentication and firestore instances
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
