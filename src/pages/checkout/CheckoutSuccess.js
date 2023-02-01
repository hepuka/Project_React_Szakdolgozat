import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Sikeres fizetés</h2>

        <br />

        <button className="--btn --btn-primary">
          <Link to="/welcome">Vissza a főoldalra</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
