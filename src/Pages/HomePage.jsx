import React from "react";
import "../Styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Your one-stop shop for all the latest products.</p>
          <a href="/product" className="shop-now-btn">
            Explore Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
