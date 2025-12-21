import userModel from "../models/userModel.js";
// add to cart
const addToCart = async (req, res) => {
  try {
    // Use req.userId
    let userData = await userModel.findOne({ _id: req.userId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Remove unnecessary await
    let cartData = userData.cartData;
    const itemId = req.body.itemId;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Use req.userId
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Successfully added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};
// remove from cart (Implementation based on typical logic)
const removeFromCart = async (req, res) => {
  try {
    // Use req.userId
    let userData = await userModel.findOne({ _id: req.userId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    let cartData = userData.cartData;
    const itemId = req.body.itemId;

    // Check if item exists in cart and reduce count
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    // Optional: If count hits 0, delete the key for cleanup
    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }

    // Use req.userId
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Successfully removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error removing item from cart",
    });
  }
};
// fetch user cart data
const getCart = async (req, res) => {
  try {
    // Use req.userId
    let userData = await userModel.findById(req.userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Remove unnecessary await
    let cartData = userData.cartData;

    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart data",
    });
  }
};

export { addToCart, removeFromCart, getCart };
