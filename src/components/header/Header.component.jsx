/* 
- Logo-t kiszervezni egy kisebb komponensbe, hogy a responzív menübe is át tudjuk adni
- styles["header-right"] []-be kell rakni mert - jel van a stílus nevében
- const [showMenu, setShowMenu] = useState(false); haburger menü state-je, látszódjon vagy sem
- hidemenU() metódussal zárom be a mobilmenüt. A metódust meghívom a div-re való kattintásra és az ul-re és a logint és aregistert tartalmazó divre is
- NavLink kell a Link helyett, hogy jelezni tudjuk az aktív oldalt. Ha kilogoljuk a NavLink state tulajdonságát akkor kapunk egy isActive tulajdonságot, és ennek a true, fakse értékének a módosításával tudjuk elérni, hogy változzon a menüelem css class-ja
- activeLink() metódussal változtatkuj a linkek stílusát, kiszervezve egy függvénybe és ezt a függvénynevet adjuk meg a link-nél mint className

- ShowOnLogin közé kell tenni azokat a menüket amelyek látszódhatnak a bejelentkezés után
*/

import React, { useState } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin from "../hiddenLink/hiddenLink";
import { AdminOnlyLink, UserOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import Notiflix from "notiflix";

// import {
//   CALCULATE_TOTAL_QUANTITY,
//   selectCartTotalQuantity,
//   selectCartTotalQuantity2,
//   CALCULATE_TOTAL_QUANTITY2,
// } from "../../redux/slice/cartSlice";

//Firebase
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <h2>kunpao's Coffe.</h2>
    </div>
  );
};

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  // const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  // const cartTotalQuantity2 = useSelector(selectCartTotalQuantity2);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        Notiflix.Notify.success("Sikeres kijelentkezés!");

        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // useEffect(() => {
  //   dispatch(CALCULATE_TOTAL_QUANTITY());
  // }, []);

  // useEffect(() => {
  //   dispatch(CALCULATE_TOTAL_QUANTITY2());
  // }, []);

  //monitor that user is login or logout
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");

        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <ShowOnLogin>
      <header>
        <Logo />

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              <Logo />
              <FaTimes size={22} color="#333" onClick={hideMenu} />
            </li>

            <AdminOnlyLink>
              <li>
                <NavLink to="/register" className={activeLink}>
                  Regisztráció
                </NavLink>
              </li>
              <li>
                <NavLink to="/business" className={activeLink}>
                  Üzleti összesítő
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-products" className={activeLink}>
                  Minden termék
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product/ADD" className={activeLink}>
                  Új termék hozzáadása
                </NavLink>
              </li>

              <li>
                <NavLink to="/add-user/ADD" className={activeLink}>
                  Új felhasználó hozzáadása
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" className={activeLink}>
                  Felhasználók
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className={activeLink}>
                  Összes rendelés
                </NavLink>
              </li>
            </AdminOnlyLink>

            <UserOnlyLink>
              <li>
                <NavLink to="/menu" className={activeLink}>
                  Menü
                </NavLink>
              </li>
              <li>
                <NavLink to="/order-history" className={activeLink}>
                  Rendelések
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={activeLink}>
                  1.asztal
                </NavLink>
              </li>

              <li>
                <NavLink to="/cart2" className={activeLink}>
                  2.asztal
                </NavLink>
              </li>
            </UserOnlyLink>

            <li>
              <NavLink to="/contact" className={activeLink}>
                Kapcsolat
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink} onClick={logoutUser}>
                Kijelentkezés
              </NavLink>
            </li>
            <li>Bejelentkezve: {displayName}</li>
          </ul>
        </nav>

        {/* responsive menü */}
        <div className={styles["menu-icon"]}>
          {/* <Cart /> */}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </header>
    </ShowOnLogin>
  );
};

export default Header;
