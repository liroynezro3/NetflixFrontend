import AuthReducer from "./AuthReducer";
import { createContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(()=>{
localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user])
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        logout:state.logout,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
