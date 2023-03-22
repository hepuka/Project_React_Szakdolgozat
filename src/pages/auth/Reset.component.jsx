import React, { useState } from "react";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";

//Firebase
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

//compomemts
import Card from "../../components/card/Card.component";
import Loader from "../../components/loader/Loader.component";

const Reset = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, emailInput)
      .then(() => {
        setIsLoading(false);
        toast.success("Ellenőrizd email fiókodat a további teendőkért!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.form}>
          <h2>Elfelejtett jelszó</h2>

          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="Email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Elküld
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/login">- Vissza -</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Reset;
