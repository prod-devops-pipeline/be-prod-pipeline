import { NextFunction, Response, Request } from "express";
import { verifyJWT } from "../utils/jwt";

interface UserPayload {
  _id: string;
  email: string;
  role: string;
}
export interface AuthRequest extends Request {
  user: UserPayload;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined =
    req.cookies[process.env.JWT_TOKEN_NAME as string];

  if (token) {
    try {
      const decode = await verifyJWT(token);
      req.user = decode;
      next();
    } catch (error: any) {
      console.log("err", error.name);
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "token exxprired" });
        }
        return res.status(401).json({ message: "Invalid token " });
      }
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not Authorized no token " });
  }
};
