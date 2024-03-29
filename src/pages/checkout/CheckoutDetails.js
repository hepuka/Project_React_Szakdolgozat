import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card.component";

import { SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.component";

const initialAddressState = {
  email: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Fizetés részletei</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Felszolgáló azonosítása</h3>
              <label>Regisztrált email cím</label>
              <input
                type="text"
                placeholder="Felszolgáló email"
                required
                name="email"
                value={shippingAddress.email}
                onChange={(e) => handleShipping(e)}
              />
            </Card>

            <Card cardClass={styles.card}>
              <button type="submit" className="--btn --btn-primary">
                Tovább a fizetéshez
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
