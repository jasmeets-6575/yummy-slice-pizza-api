import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const uploadProductImage:RequestHandler = async (req,res) => {
  res.send("upload product image");
}