import { Request, Response, NextFunction } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const user = req.user;
  if (!user) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }
  return next();
};
