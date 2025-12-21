import foodModel from "../models/FoodModel.js";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

//add food item

const addFood = async (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: "Error: No image file uploaded.",
    });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-delivery",
      resource_type: "image"
    });

    const food = new foodModel({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: result.secure_url, // Store Cloudinary URL instead of filename
      description: req.body.description,
    });

    await food.save();

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({ success: true, message: "Food Item Added Successfully" });
  } catch (error) {
    console.error("Cloudinary/Database Error:", error);
    
    // Attempt to delete local file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    }

    res.json({
      success: false,
      message: "Error while adding food item.",
    });
  }
};

// all food lists

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
const removeFood = async (req, res) => {
  try {
    const foodId = req.body._id || req.body.id;
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.json({
        success: false,
        message: "Food item not found.",
      });
    }

    // Delete image from Cloudinary or local
    if (food.image.startsWith("http")) {
      // Extract public_id from Cloudinary URL
      // Example: https://res.cloudinary.com/demo/image/upload/v12345/folder/name.jpg -> folder/name
      const urlParts = food.image.split('/');
      const filenameWithExtension = urlParts[urlParts.length - 1];
      const filename = filenameWithExtension.split('.')[0];
      const folder = urlParts[urlParts.length - 2];
      
      // If there's a folder (like 'food-delivery') we need to include it
      const publicId = `${folder}/${filename}`;
      
      await cloudinary.uploader.destroy(publicId);
    } else {
      // Fallback for local files if any exist
      if (fs.existsSync(`uploads/${food.image}`)) {
        fs.unlinkSync(`uploads/${food.image}`);
      }
    }

    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food Item Removed Successfully" });
  } catch (error) {
    console.error("Error while removing food item:", error);
    res.json({ success: false, message: "Error while removing food item" });
  }
};
export { addFood, listFood, removeFood };
