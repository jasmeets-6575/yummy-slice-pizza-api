import { RequestHandler } from "express";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Products";
import { CustomAPIError } from "../errors/custom-error";
import { NotFound } from "../errors/not-found";

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

export const uploadImage: RequestHandler = async (req, res) => {
  res.send("upload image");
};
