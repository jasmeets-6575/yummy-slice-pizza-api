import { RequestHandler } from "express";
import { NextFunction, Response, Request } from "express";

export const createProduct: RequestHandler = async (req, res) => {
  res.send("create product");
};

export const getAllProducts: RequestHandler = async (req, res) => {
  res.send("get all products");
};

export const getSingleProduct: RequestHandler = async (req, res) => {
  res.send("get single product");
};

export const updateProduct: RequestHandler = async (req, res) => {
  res.send("update product");
};

export const deleteProduct: RequestHandler = async (req, res) => {
  res.send("delete product");
};

export const uploadImage: RequestHandler = async (req, res) => {
  res.send("upload image");
};
