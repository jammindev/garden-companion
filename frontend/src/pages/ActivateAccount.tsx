import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import backendRoutes from "@/api/apiRoutes";

const ActivateAccount = () => {
  const { uid, token } = useParams(); // Retrieve `uid` and `token` from URL
  const [status, setStatus] = useState(""); // Status message
  const navigate = useNavigate(); // For navigation after activation

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.post(backendRoutes.activate, { uid, token });
        if (response.status === 204) {
          setStatus("Account activated successfully!");
          setTimeout(() => navigate("/auth/login"), 3000);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          setStatus("This account is already active.");
        } else {
          setStatus("Activation failed. Please try again.");
        }
      }
    };

    activateAccount(); 
  }, [uid, token, navigate]);

  return (
    <div className="activation-container">
      <h2>Account Activation</h2>
      {status ? <p>{status}</p> : <p>Activating your account, please wait...</p>}
    </div>
  );
};

export default ActivateAccount;