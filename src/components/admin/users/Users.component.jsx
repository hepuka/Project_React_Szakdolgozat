import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Loader from "../../loader/Loader.component";
import styles from "../viewProduct/ViewProduct.module.scss";
import { selectUsers } from "../../../redux/slice/userSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { STORE_USERS } from "../../../redux/slice/userSlice";
import { db } from "../../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import Notiflix from "notiflix";

const Users = () => {
  const { data, isLoading } = useFetchCollection("users");
  const users = useSelector(selectUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_USERS({
        users: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete User!",
      "You are about to delete this user.",
      "Delete",
      "Cancel",

      function okCb() {
        deleteUser(id);
      },

      function cancelCb() {
        console.log("Delete Canceled!");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));

      toast.success("Sikeres felhasználótörlés!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(users);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        {users.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sorszám</th>
                <th>Név</th>
                <th>Email</th>
                <th>Adószám</th>
                <th>Jogosultság</th>
                <th>PIN kód</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                const { id, name, email, tax, role, pin } = item;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{tax}</td>
                    <td>{role}</td>
                    <td>{pin}</td>

                    <td className={styles.icons}>
                      <Link to={`/add-user/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Users;
