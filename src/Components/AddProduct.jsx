import React, { useReducer } from "react";
import "../Styles/AddProduct.css";
import { initialState, reducer } from "../Utilities/FormLogic";
import axios from "axios";
const AddProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://react-mini-web-db.onrender.com/products`, state)
      .then((err) => {
        alert("Product added successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            onChange={(e) =>
              dispatch({ type: "TITLE", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            onChange={(e) =>
              dispatch({ type: "IMAGE", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            onChange={(e) =>
              dispatch({ type: "PRICE", payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            onChange={(e) =>
              dispatch({ type: "CATEGORY", payload: e.target.value })
            }
            required
          >
            <option value="">Select category</option>
            <option value="electronics">men's clothing</option>
            <option value="clothing">jewelery</option>
            <option value="books">electronics</option>
            <option value="home">women's clothing</option>
          </select>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            onChange={(e) =>
              dispatch({ type: "DESCRIPTION", payload: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
