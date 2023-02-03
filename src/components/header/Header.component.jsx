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
import { Link, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin from "../hiddenLink/hiddenLink";
import { AdminOnlyLink, UserOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";

import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

//Firebase
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/welcome">
        <h2>kunpao's Coffe.</h2>
      </Link>
    </div>
  );
};

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

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
        toast.success("Sikeres kijelentkezés!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

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

  const Cart = () => {
    return (
      <span className={styles.cart}>
        <Link to="/cart">
          1. asztal
          <p>{cartTotalQuantity}</p>
        </Link>
      </span>
    );
  };

  const Cart2 = () => {
    return (
      <span className={styles.cart}>
        <Link to="/cart2">
          2. asztal
          <p>{cartTotalQuantity}</p>
        </Link>
      </span>
    );
  };

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
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
          >
            {" "}
          </div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              <Logo />
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                {/*                 <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link> */}
                <NavLink to="/admin/home" className={activeLink}>
                  Admin
                </NavLink>
              </AdminOnlyLink>
            </li>
            <li>
              <AdminOnlyLink>
                <NavLink to="/register" className={activeLink}>
                  Regisztráció
                </NavLink>
              </AdminOnlyLink>
            </li>

            <li>
              <UserOnlyLink>
                <ShowOnLogin>
                  <NavLink to="/menu" className={activeLink}>
                    Menü
                  </NavLink>
                </ShowOnLogin>
              </UserOnlyLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <UserOnlyLink>
                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    Rendelések
                  </NavLink>
                </ShowOnLogin>
              </UserOnlyLink>
              <ShowOnLogin>
                <NavLink to="/contact" className={activeLink}>
                  Kapcsolat
                </NavLink>
                <NavLink to="/" className={activeLink} onClick={logoutUser}>
                  Kijelentkezés
                </NavLink>
                <a href="#home" style={{ color: "white" }}>
                  {displayName}
                </a>
              </ShowOnLogin>
            </span>
            <UserOnlyLink>
              <ShowOnLogin>
                <Cart />
              </ShowOnLogin>
            </UserOnlyLink>
            <UserOnlyLink>
              <ShowOnLogin>
                <Cart2 />
              </ShowOnLogin>
            </UserOnlyLink>
          </div>
        </nav>

        {/* responsive menü */}
        <div className={styles["menu-icon"]}>
          <Cart />
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
