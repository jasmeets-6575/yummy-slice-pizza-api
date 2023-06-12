import { RequestHandler } from "express";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Products";
import { CustomAPIError } from "../errors/custom-error";
import { NotFound } from "../errors/not-found";
import { BadRequest } from "../errors/bad-request";
import fileUpload from "express-fileupload";
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import path from "path";

interface uploadimage {
    image : fileUpload.UploadedFile[]
}

export const createProduct: RequestHandler = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
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

export const uploadImage = async (req:Request, res:Response ) => {
  if (!req.files) {
    throw new BadRequest("No file Uploaded");
  }
  const productImage:uploadimage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequest("Please Upload Image");
  }
  const maxSize = 1024*1024;
  if(productImage.size > maxSize){
    throw new BadRequest("Please upload image smaller than 1mb")
  }
  const imagePath = path.join(__dirname,".././public/uploads/"+`${productImage.name}`)
  await productImage.mv(imagePath)

  res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
};
