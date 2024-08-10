import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useAuth = create((set) => ({
  Auth: localStorage.getItem("authTokens")
    ? jwtDecode(localStorage.getItem("authTokens"))
    : null,
  setAuth: (val) => set(() => ({ Auth: val })),
}));

export default useAuth;
