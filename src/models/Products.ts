import mongoose, { Document, Schema } from "mongoose";

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
    default: ".././public/uploads/example.jpg",
    required: true,
  },
  category: {
    type: String,
    required: [true, " please provide category"],
    enum: [
      "our menu",
      "best sellers",
      "favorite toppings",
      "Pizza Mania",
      "burgers",
      "shakes",
      "sandwich",
      "Sides",
    ],
  },
  group: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<SchemaInput>("Products", ProductSchema);
