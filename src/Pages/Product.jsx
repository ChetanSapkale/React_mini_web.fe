import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Styles/Product.css";
import { Link } from "react-router-dom";

const Product = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    try {
      const res = await axios.get(`https://react-mini-web-db.onrender.com/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = sortProducts([...filteredProducts], order);
    setFilteredProducts(sorted);
  };

  const sortProducts = (productsArray, order) => {
    if (order === "lowToHigh") {
      return productsArray.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      return productsArray.sort((a, b) => b.price - a.price);
    }
    return productsArray;
  };
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlepagination = (type) => {
    if (type === "next") {
      setCurrentPage(currentPage + 1);
    } else if (type === "prev") {
      setCurrentPage(currentPage - 1);
    }
  };

  return loading ? <h1>Loading...</h1> : (
    <div>
      <h1>Products</h1> <hr />

      <div className="filter-buttons">
        <h3>Categories :</h3>
        <button onClick={() => handleFilter("all")} className={selectedCategory === "all" ? "active" : ""}>All</button>
        <button onClick={() => handleFilter("men's clothing")} className={selectedCategory === "men's clothing" ? "active" : ""}>Men's Clothing</button>
        <button onClick={() => handleFilter("women's clothing")} className={selectedCategory === "women's clothing" ? "active" : ""}>Women's Clothing</button>
        <button onClick={() => handleFilter("jewelery")} className={selectedCategory === "jewelery" ? "active" : ""}>Jewelery</button>
        <button onClick={() => handleFilter("electronics")} className={selectedCategory === "electronics" ? "active" : ""}>Electronics</button>
      </div>

      <div className="sort-dropdown">
        <label>Sort By: </label>
        <select onChange={(e) => handleSort(e.target.value)} value={sortOrder}>
          <option value="">Select</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="pagination">
        <button onClick={() => handlepagination("prev")} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlepagination("next")} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className="product-container">
        {paginatedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <h4>Category : {product.category}</h4>
            <p className="price">Price: ${product.price}</p>
            <Link to={`/description/${product.id}`}> <button className="btn">View Product Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
