import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

//compomemts
import Card from "../../components/card/Card.component";
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
        toast.success("Sikeres bejelentkezés!");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width={400} />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Bejelentkezés</h2>
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
                <Link to="/reset">Elfelejtett jelszó</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
