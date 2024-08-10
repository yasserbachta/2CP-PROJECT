import { useState } from "react";
import { LogoP } from "../../assets";
import { Input } from "../../components/ui";
import axios from "../../api/axios";
import useAuth from "../../context/AuthContext";
import useAuthTokens from "../../context/AuthTokens";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
//loginnnnnnnnnnnnnnnnnnnn

const Login = () => {
  //
  //request
  const { setAuthTokens } = useAuthTokens();
  const { Auth, setAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a POST request to the API using axios
      const response = await axios.post(
        "/api/login/",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the request is successful, process the response
      if (response.status === 200) {
        const data = response.data;
        console.log("working");
        console.log(data);
        console.log(response);
        console.log(jwtDecode(data.access));
        setAuthTokens(data);
        setAuth(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle errors based on their response status
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        console.log(error);
        alert("Something went wrong!");
      }
    }
  };

  // the component
  if (Auth) {
    return <Navigate to="/classes" />;
  }
  return (
    <div className=" w-full min-h-lvh flex items-center justify-center flex-col gap-[35px] bg-bgpurp">
      <div className="flex flex-col sm:flex-col-reverse justify-center items-center gap-[29px]">
        <img
          className="w-[92px] h-[92px]  sm:w-[100px] sm:h-[100px] "
          src={LogoP}
          alt="logo"
        />
        <h2 className="text-center font-poppins text-headcolor font-semibold text-[22px] sm:text-[33px]">
          Bienvenue, Connectez-vous <br className="sm:hidden" /> à votre compte
        </h2>
      </div>
      <div className="w-full flex flex-col gap-[17px] items-center justify-between relative">
        <form
          onSubmit={loginUser}
          className="w-full flex flex-col gap-[17px] items-center justify-between relative"
          action=""
        >
          <Input
            data={{
              string: "Entrer votre nom d'utilisateur",
              type: "text",
              name: "username",
            }}
          />
          <Input
            data={{
              string: "Entrer le mot de passe",
              type: "password",
              name: "password",
            }}
          />
          <button
            className={
              "py-5 flex justify-center px-4  bg-primarypurp w-[70%] max-w-[400px] font-kumbhfont text-white font-normal rounded-[5px]"
            }
          >
            {loading ? <Spinner size="sm" color="default" /> : "Connecter"}
          </button>
        </form>
        <div className="flex items-center justify-center flex-col">
          <p className="text-textgray1">Vous n’avez pas encore de compte?</p>
          <a
            className="text-primarypurp font-semibold text-center hover:underline"
            href="##"
          >
            Contacter l’adminstration
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
