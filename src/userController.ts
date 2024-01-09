import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { pick, omit } from "lodash";
import { signJwt } from "./jtw.utils";
import { createSession } from "./sessionServices";

export const primsa = new PrismaClient();

const secureFields = ["password", "sessionToken", "refreshToken"];

export const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const newUser = await primsa.user.create({
      data: {
        email,
        password,
      },
    });
    res.status(201).json(omit(newUser, secureFields));
  } catch (error) {
    console.log(error);
  }
};
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await primsa.user.findFirst({
      where: {
        email,
      },
    });
    if (!user || user.password !== password) {
      res.status(403).json({
        message: "either email or password does not match",
      });
    }
    const session = await createSession(user!.id);

    const accessToken = signJwt({
      payload: omit(user, secureFields),
      expiresIn: "50s",
    });
    const refreshToken = signJwt({
      payload: { userId: user!.id, sessionId: session.id },
      expiresIn: "2m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 300000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 8.64e7,
    });
    res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.log(error);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
  });
  res.cookie("refreshToken", "", {
    maxAge: 0,
  });
  res.status(200).json({
    message: "logged out succesfully",
  });
};
