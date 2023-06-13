import { RequestHandler } from "express";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Products";
import { NotFound } from "../errors/not-found";
import { BadRequest } from "../errors/bad-request";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

export const getSingleProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFound(`No product with id:${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFound(`No product with id:${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId });
  if (!product) {
    throw new NotFound(`No product with id:${productId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Product Removed..." });
};

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new BadRequest("No file Uploaded");
  }
  const productImage = req.files.image as UploadedFile;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequest("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequest("Please upload image smaller than 1mb");
  }
  const imagePath = path.join(
    __dirname,
    "../../public/uploads/" + `${productImage.name}`
  );
  try {
    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
  } catch (error) {
    console.log(error);
  }
};
