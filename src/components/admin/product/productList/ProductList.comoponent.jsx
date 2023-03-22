import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import Search from "../../../search/Search.component";
import ProductItem from "../productItem/ProductItem.component";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../../redux/slice/filterSlice";
import Pagination from "../../../pagination/Pagination.component";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles["product-list"]} id="kunpaosproducts">
      <div className={styles.top}>
        <div className={styles.icons}>
          <p>
            <b>{filteredProducts.length}</b> termék a kínálatban
          </p>
        </div>
        {/* Search icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Rendezés:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="Latest">utoljára hozzáadott</option>
            <option value="lowest-price">olcsó-drága</option>
            <option value="highest-price">drága-olcsó</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>Nincs termék a listában!</p>
        ) : (
          <>
            {currentProducts.map((item) => {
              return (
                <div key={item.id}>
                  <ProductItem {...item} grid={grid} product={item} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
