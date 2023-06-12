import mongoose, { Document, Schema } from "mongoose";

enum pizzaMania {
  veg1 = "VEG 1",
  veg2 = "VEG 2",
  veg3 = "VEG 3",
}

enum burgerFries {
  burgers = "BURGERS",
  fries = "FRIES",
}
enum shakesSandwich {
  shakes = "SHAKES",
  sandwich = "SANDWICH",
}
enum wrapsBreads {
  wraps = "WRAPS",
  breads = "BREADS",
}

interface SchemaInput extends Document {
  name: string;
  price: number;
  description:string;
  image:string;
  category:string[];
  featured:boolean
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
      pizzaMania,
      burgerFries,
      shakesSandwich,
      wrapsBreads,
      "DESSERTS",
    ],
  },
  featured: {
    type:Boolean,
    default: false
  }
});

export default mongoose.model<SchemaInput>("Products", ProductSchema);
