import { Request, Response, NextFunction } from "express";
import { verifyJwt, DecodedRefreshToken, signJwt } from "./jtw.utils";
import { getSessionById } from "./sessionServices";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt({ token: accessToken });

  if (decoded) {
    //@ts-ignore
    req.user = decoded;
    return next();
  }
  const { decoded: refData, expired: refExpired } =
    expired || refreshToken
      ? (verifyJwt({ token: refreshToken }) as {
          decoded: DecodedRefreshToken;
          expired: boolean;
        })
      : { decoded: null, expired: true };

  if (!refData || refExpired) {
    return res.status(403).json({
      message: "session expired",
    });
  }
  const session = await getSessionById(refData.sessionId);
  if (!session) {
    return res.status(403).json({
      message: "session expired",
    });
  }
  const newAccessToken = signJwt({
    payload: { userId: refData.userId },
    expiresIn: "50s",
  });

  const newData = verifyJwt({ token: newAccessToken }).decoded;
  //@ts-ignore
  req.user = newData;

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 300000,
  });
  next();
};
