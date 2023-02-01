import { useRef } from "react";
import Card from "../../components/card/Card.component";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        "service_4661qd7",
        "template_wjdie3h",
        form.current,
        "_geOTjcVpuDwzlJcL"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Kapcsolat</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Név</label>
              <input
                type="text"
                name="user_name"
                placeholder="Adja meg a nevét"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Adja meg email címét"
                required
              />
              <label>Tárgy</label>
              <input
                type="text"
                name="subject"
                placeholder="Üzenet tárgya"
                required
              />
              <label>Üzenet</label>
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Küldje el nekünk észrevételét"
              ></textarea>
              <button className="--btn --btn-primary">Küldés</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Lépjen kapcsolatba velünk</h3>
              <p>
                Kérjük töltse ki az űrlapot vagy keressen minket az alábbi
                elérhetőségeken
              </p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+3630 1111 222</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>support@hepukashop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Debrecen, HUNGARY</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@hepuka</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
