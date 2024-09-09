import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AdminButton = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the role
      setRole(decodedToken.role); // Set the role in state
    }
  }, []); // This effect runs only once, when the component mounts

  return (
    <div>
      {role === "leader" ? (
        <button onClick={() => console.log("Leader action triggered")}>
          Leader-Only Action
        </button>
      ) : (
        <p>You do not have access to this button.</p>
      )}
    </div>
  );
};

export default AdminButton;

<button
  onClick={handleNavigateToLeaderDashboard}
  className="primary-black"
  style={{ padding: "1rem", margin: "2rem" }}
>
  Leader
</button>;
