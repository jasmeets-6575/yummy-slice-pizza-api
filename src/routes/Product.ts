import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/Product";
import { uploadImage } from "../controllers/uploadImage";

router.route("/").post(createProduct).get(getAllProducts);

router.route("/uploadimage").post(uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
