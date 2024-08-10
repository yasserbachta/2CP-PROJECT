import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import ErrorPage from "../pages/error/Error";
import Loading from "../layout/Loading";

//by default the private route checks only if the user is authenticated
//if you want to check for a specific role you can pass it as a prop , pass an array of roles that are allowed to access the route
// example: <Route  path="/path..."  element={ <PrivateRoute element={<theElement/>} role={["admin","student"]} /> } />

// const PrivateRoute = ({ element, role = ["admin", "student", "teacher"] }) => {
//   const { Auth } = useAuth();
//   if (!Auth) {
//     return <Navigate to="/login" />;
//   }
//   return role.includes(Auth.role) ? element : <ErrorPage />;
// };

const PrivateRoute = ({ element, role = ["admin", "student", "teacher"] }) => {
  const { Auth } = useAuth();

  //matsa9sinich wch ada , ma tna7ich w brk
  if (Auth === "changeSituation") {
    return <Loading />;
  }

  if (!Auth) {
    return <Navigate to="/login" />;
  }

  return role.includes(Auth?.role) ? element : <ErrorPage />;
};

export default PrivateRoute;
