import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "admin@gmail.com") {
    return children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Belépés megtagadva!</h2>
        <p>Ez az oldal csak admin jogosultsággal tekinthető meg!</p>
        <br />
        <Link to="/welcome">
          <button className="--btn">&larr; Vissza a főoldalra</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "admin@gmail.com") {
    return children;
  }

  return null;
};

export const UserOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail !== "admin@gmail.com") {
    return children;
  }

  return null;
};

export default AdminOnlyRoute;
