import mongoose, { Document, Schema } from "mongoose";

enum categories {
  ourMenu = "OUR MENU",
  bestSellers = "BEST SELLERS",
  singleToppings = "SINGLE TOPPINGS",
  doubleToppings = "DOUBLE TOPPINGS",
  desserts = "DESSERTS",
}
interface SchemaInput extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
  featured: boolean;
}

const ProductSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, " please enter a value"],
    maxlength: [100, "You limit exceeds"],
  },
  price: {
    type: Number,
    required: [true, " please enter product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, " please enter description"],
    minlength: [10, "please explain more"],
  },
  image: {
    type: String,
    default: 0,
  },
  category: {
    type: String,
    required: [true, " please provide category"],
    enum: [
      "OUR MENU",
      "BEST SELLERS",
      "SINGLE TOPPINGS",
      "DOUBLE TOPPINGS",
      "VEG 1",
      "VEG 2",
      "VEG 3",
      "BURGERS",
      "FRIES",
      "SHAKES",
      "SANDWICH",
      "WRAPS",
      "BREADS",
      "DESSERTS",
    ],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<SchemaInput>("Products", ProductSchema);
