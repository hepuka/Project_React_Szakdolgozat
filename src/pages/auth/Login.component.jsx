import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

//compomemts
import Loader from "../../components/loader/Loader.component";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/welcome");
    }
  };

  const loginUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredential) => {
        //const user = userCredential.user;
        setIsLoading(false);
        Notiflix.Notify.success("Sikeres bejelentkezés!");

        redirectUser();
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);

        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.form}>
        <h2>KunPao's Coffee POS Register</h2>
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Email"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Jelszó"
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button type="submit" className="--btn --btn-primary --btn-block">
            Tovább
          </button>

          <div className={styles.links}>
            <Link to="/reset"> --- Elfelejtett jelszó --- </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
