import { useContext } from "react";

import { AuthContext } from "../authContext";

function SignIn() {
  const { onSignIn } = useContext(AuthContext);

  return <button onClick={onSignIn}>Sign In with Google!</button>;
}

export default SignIn;
