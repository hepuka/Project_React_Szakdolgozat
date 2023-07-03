/*
1.
- useState-ek az input mezőkre
- input mezők attrribútumainak megadni a value-t és az onchange-et
- button gombnak megadni a type="submit"-ot
- form mezőre meghívni onSubmit-ot, megadni neki a függvényt amit végrehajt
- komponens return utasítása előtt elkészíteni a registerUser függvényt

2.
registerUser függvény
- npm i react-toastify
- https://firebase.google.com/docs/auth/web/password-auth
- const navigate = useNavigate(); a metódus végére kell, hogy melyik oldalra navigáljon ha befejeződött a metódus. pl. a regisztráció befejezésekor a navigate("login")-ra

*/

import React, { useState } from "react";
import styles from "./Register.module.scss";
//Firebase Import

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

//compomemts

import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader.component";

const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (passwordInput !== passwordConfirm) {
      toast.error("Hibás bejelentkezési adat!");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setIsLoading(false);
        toast.success("Sikeres regisztráció!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.form}>
        <h2>Új felhasználó regisztrálása</h2>
        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Email"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Jelszó"
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Adja meg újra jelszavát"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button type="submit" className="--btn --btn-primary --btn-block">
            Regisztráció
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
