/* 
    showOnLogin és a ShowOnLogout és a ShowBasic, ShowAdmin feüggvényekbe kell nerakni azokat amik látszódhatnak
*/

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import Header from "../header/Header.component";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
