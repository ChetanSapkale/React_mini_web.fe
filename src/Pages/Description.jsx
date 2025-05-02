import React, { useEffect, useState } from "react";
import "../Styles/Description.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Description = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const getSingleProduct = async () => {
    setLoading(true);
    setError(null)
    try {
      const products = await axios.get(`https://react-mini-web-db.onrender.com/products/${id}`);
      setSingleProduct(products.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load product details");
      console.log(error);
      setLoading(false);
    }
  };

  const handleCart = async () => {
    try {
      const { data } = await axios.get(`https://react-mini-web-db.onrender.com/cart`);
      const isPresent = data.find((el) => el.id === singleProduct.id);
      console.log(isPresent);
      if (isPresent) {
        axios
          .patch(`https://react-mini-web-db.onrender.com/cart/${isPresent.id}`, {
            quantity: isPresent.quantity + 1,
          })
          .then((res) => {
            alert("Product quantity updated in cart");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`https://react-mini-web-db.onrender.com/cart`, { ...singleProduct, quantity: 1 })
          .then((res) => {
            alert("Product added to cart");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleBuy = () => {
    alert("Product Purchesed...");
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);
  
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="description-container">
      <div className="image-section">
        <img src={singleProduct.image} alt={singleProduct.title} />
      </div>
      <div className="details-section">
        <h2>{singleProduct.title}</h2>
        <p className="category">Category: {singleProduct.category}</p>
        <p className="price">${singleProduct.price}</p>
        <p className="desc">{singleProduct.description}</p>
        <div className="rating">
          ⭐ {singleProduct?.rating?.rate} ({singleProduct?.rating?.count}{" "}
          reviews)
        </div>
        <button className="buy-btn" onClick={handleBuy}>
          Buy Now
        </button>
        <button className="buy-btn" onClick={handleCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Description;
