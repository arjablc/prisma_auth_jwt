import jwt from "jsonwebtoken";

const secret = "top secret secret";

export type DecodedRefreshToken = {
  userId: string;
  sessionId: string;
};

export const signJwt = (parameters: {
  payload: Object;
  expiresIn: string | number;
}) => {
  const payload = jwt.sign(parameters.payload, secret, {
    expiresIn: parameters.expiresIn,
  });
  return payload;
};

export const verifyJwt = <DecodedRefreshToken>(parameters: {
  token: string;
}) => {
  try {
    const decoded = jwt.verify(parameters.token, secret);

    return { decoded: decoded as DecodedRefreshToken, expired: false };
  } catch (error: any) {
    return { decoded: null, expired: error.message.includes("expired") };
  }
};
