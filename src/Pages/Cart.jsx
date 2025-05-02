import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/Cart.css'

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getCartData = async () => {
    try {
      const res = await axios.get("https://react-mini-web-db.onrender.com/cart");
      console.log(res.data);
      setCart(res.data);
    } catch (error) {
      console.log("Error in getting cart data", error);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`https://react-mini-web-db.onrender.com/cart/${id}`);
      alert("Product removed from cart");
      getCartData();
    } catch (error) {
      console.log("Error in removing from cart", error);
    }
  };

  const handleUpdateQuantity = async (id, method) => {
    try {
      const res = await axios.get(`https://react-mini-web-db.onrender.com/cart/${id}`);

      const UpdatedQuantity =
        method === "increment" ? res.data.quantity + 1 : res.data.quantity - 1;

      await axios
        .patch(`https://react-mini-web-db.onrender.com/cart/${id}`, {
          quantity: UpdatedQuantity,
        })
        .then((res) => {
          alert("Product quantity updated in cart");
          getCartData();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error in updating quantity", error);
    }
  };

  let totalPrice = 0;
  cart.forEach((el) => {
    totalPrice += el.price * el.quantity;
  });

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <h1>Cart</h1>
      <div className="cart-container">
        {cart.length === 0 ? (
          <h3 className="empty-cart">Cart is empty</h3>
        ) : (
          cart.map((el) => (
            <div className="cart-item" key={el.id}>
              <img src={el.image} alt={el.title} />
              <div className="cart-details">
                <h4>{el.title}</h4>
                <p>${el.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <button disabled={el.quantity === 1} onClick={() => handleUpdateQuantity(item.id, "decrement")}>-</button>
                  <span>{el.quantity}</span>
                  <button onClick={()=> handleUpdateQuantity(el.id, "increment")}>+</button>
                </div>
                <button onClick={()=> handleRemoveFromCart(el.id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))
        )}
        <div className="total-section">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
    </>
  );
};

export default Cart;
