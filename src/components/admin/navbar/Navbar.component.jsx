import React from "react";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.user}></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Üzleti összesítő
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              Minden termék
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
              Összes rendelés
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
