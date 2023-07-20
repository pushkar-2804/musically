import "./Auth.css";
import googleImg from "../assets/google.png";
import { auth } from "../security/firebase";
import firebase from "../security/firebase";

const Auth = () => {
  const handleSignInWithGoogle = () => {
    // Create a Google sign-in provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with Google using a popup window

    auth.signInWithPopup(provider).catch((error) => {
      // Handle sign-in errors if needed
      console.error(error);
    });
  };
  return (
    <div className="background">
      <div className="login">
        <h1>Welcome to Musically</h1> Please SignIn to continue
        <button onClick={handleSignInWithGoogle}>
          <img src={googleImg} width="40px" />
          SignIn With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
