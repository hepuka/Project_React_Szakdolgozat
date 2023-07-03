import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProduct.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader.component";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search.component";
import Pagination from "../../pagination/Pagination.component";

const ViewProduct = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("kunpaosproducts");
  const products = useSelector(selectProducts);

  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!",
      "You are about to delete this product.",
      "Delete",
      "Cancel",

      function okCb() {
        deleteProduct(id, imageURL);
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

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("Sikeres terméktörlés!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.table}>
        <div className={styles.search}>
          <p>
            <span>{filteredProducts.length}</span> termék a listában
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sorszám</th>
                <th>Kép</th>
                <th>Név</th>
                <th>Kategória</th>
                <th>Ár</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`${price} Ft`}</td>
                    <td className={styles.icons}>
                      <Link to={`/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};
export default ViewProduct;
