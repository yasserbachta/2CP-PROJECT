import { create } from "zustand";
// import jwt_decode from "jwt-decode";

const useAuthTokens = create((set) => ({
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  setAuthTokens: (val) => set(() => ({ authTokens: val })),
}));

export default useAuthTokens;
