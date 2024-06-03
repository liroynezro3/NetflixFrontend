import axios from "axios";
import { loginFailure, loginStart, loginSuccess,logoutStart} from "./AuthActions";
export const login = async (user, dispatch) => {
  dispatch(loginStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.post(`${process.env.REACT_APP_NETFLIXBACKEND}/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    alert(err)
  }
};

export const logout = async ( dispatch) => {
  dispatch(logoutStart()); 
};