/* 
    showOnLogin és a ShowOnLogout és a ShowBasic, ShowAdmin függvényekbe kell nerakni azokat amik látszódhatnak
*/

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
