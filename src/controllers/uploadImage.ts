import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/bad-request";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";

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
    return res
      .status(StatusCodes.OK)
      .json({ image: `/uploads/${productImage.name}` });
  } catch (error) {
    console.log(error);
  }
};
