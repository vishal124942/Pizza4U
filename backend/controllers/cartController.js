import userModel from "../models/userModel.js";

// add to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Initialize cartData if it's null or undefined
    let cartData = userData.cartData || {};
    // Add item to the cart or increase its quantity
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Ensure the item exists in the cart and the quantity is more than 0
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      // Optionally, remove the item from cart if the quantity becomes 0
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Item not in cart or quantity is already 0",
      });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error retrieving cart" });
  }
};

export { addToCart, removeFromCart, getCart };
