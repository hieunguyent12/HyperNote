import { useContext } from "react";

import { AuthContext } from "../authContext";

function User() {
  const { onLogout, authState } = useContext(AuthContext);
  const { user } = authState;

  return (
    <div>
      <p>User: {user.email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default User;
