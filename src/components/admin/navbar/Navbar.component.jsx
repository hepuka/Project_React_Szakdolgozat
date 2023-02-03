import React from "react";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Főoldal
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              Összes termék
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Új termék hozzáadása
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-user/ADD" className={activeLink}>
              Új felhasználó hozzáadása
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={activeLink}>
              Felhasználók
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Megrendelések
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
