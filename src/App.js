import { useContext } from "react";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

import "./App.css";
import { AuthContext } from "./authContext";
import Notes from "./components/Notes";
import User from "./components/User";
import SignIn from "./components/SignIn";

function App() {
  const { authState } = useContext(AuthContext);

  const appHeading = <h1>HyperNote</h1>;

  // Check if firebase is still processing the authentication state
  if (authState.pending) {
    return (
      <div>
        {appHeading}
        <p>Loading...</p>
      </div>
    );
  }

  // Check if the user is logged in or not
  if (authState.isSignedIn) {
    return (
      <div className="App">
        {appHeading}
        <User />
        <Notes />
      </div>
    );
  } else {
    return (
      <div>
        {appHeading}
        <p>Sign in to view your notes</p>
        <SignIn />
      </div>
    );
  }
}

export default App;
