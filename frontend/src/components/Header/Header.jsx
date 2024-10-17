import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favorite Pizza Here</h2>
        <p>
          Indulge in a wide variety of mouth-watering pizzas, made with the
          freshest ingredients and baked to perfection. Whether you're craving
          classic flavors or adventurous combinations, we’re here to deliver a
          slice of happiness, one pizza at a time.
        </p>

        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
