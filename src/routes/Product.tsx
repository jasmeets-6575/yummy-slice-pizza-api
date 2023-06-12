import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/Product";
import { uploadProductImage } from "../controllers/uploadsControllers";

router.route("/").post(createProduct).get(getAllProducts);

router.route("/uploadImage").post(uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
