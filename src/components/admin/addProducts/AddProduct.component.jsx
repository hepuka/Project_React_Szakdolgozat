import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card.component";
import Loader from "../../loader/Loader.component";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Kávé" },
  { id: 2, name: "Italok" },
  { id: 3, name: "Sütemények" },
];

const initialSate = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  packaging: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialSate }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `kunpaosCoffee/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Sikeres képfeltöltés!");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addDoc(collection(db, "kunpaosproducts"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        packaging: product.packaging,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialSate });

      toast.success("Sikeres termék feltöltés!");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "kunpaosproducts", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        packaging: product.packaging,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      toast.success("Termék adatai módosítva!");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>
          {detectForm(
            id,
            "Új termék hozzáadása",
            "Termék adatainak módosítása"
          )}
        </h2>

        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label>Termék neve</label>
          <input
            type="text"
            placeholder="név"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Kép hozzáadása</label>

          {uploadProgress === 0 ? null : (
            <div className={styles.progress}>
              <div
                className={styles["progress-bar"]}
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100
                  ? `Uploading ${uploadProgress}`
                  : `Upload completed! ${uploadProgress}%`}
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
          {product.imageURL === "" ? null : (
            <input
              type="text"
              name="imageURL"
              placeholder="Image URL"
              value={product.imageURL}
              required
              disabled
            />
          )}

          <label>Egységár (Ft)</label>
          <input
            type="text"
            placeholder="Product price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Kategória</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- Válassz kategóriát --
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <label>Mennyiség</label>
          <input
            type="text"
            placeholder="Add meg a termék mennyiségét"
            required
            name="packaging"
            value={product.packaging}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Termék leírása</label>
          <textarea
            name="desc"
            value={product.desc}
            required
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>

          <button className="--btn --btn-primary">
            {detectForm(id, "Hozzáad", "Módosít")}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
