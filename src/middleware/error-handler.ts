import { NextFunction, Response, Request } from "express";
import { CustomAPIError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};
