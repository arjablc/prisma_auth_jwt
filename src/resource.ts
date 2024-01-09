import { Request, Response, NextFunction } from "express";

export const getResouceHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resource = {
    name: "this is the resouce name",
    price: 12.22,
  };
  res.status(200).json(resource);
};
