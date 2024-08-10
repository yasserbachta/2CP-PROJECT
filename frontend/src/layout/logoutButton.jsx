import { logout } from "../assets";
import useAuth from "../context/AuthContext";
import useAuthTokens from "../context/AuthTokens";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function LogoutButton() {
  const { authTokens, setAuthTokens } = useAuthTokens();
  const { setAuth } = useAuth();
  const { Auth } = useAuth();

  const navigate = useNavigate();
  const logoutUser = async () => {
    // try {
    //   const response = await axios.post("api/logout/", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response);
    // } catch (err) {
    //   console.error("Error sending data:", err);
    // }
    setAuthTokens(null);
    setAuth(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };
  return (
    <div onClick={() => {logoutUser()}} className={`${Auth.role == 'admin' ? ' rounded-md' : 'rounded-b-md'} hover:bg-[#FF4550] h-[50px] gap-2  p-2 flex items-center justify-center hover:cursor-pointer transition-all`}>
      <img src={logout} className="w-[20px]" alt="" />
      <p className="text-black font-semibold">Logout</p>
    </div>
  );
}

export default LogoutButton;
