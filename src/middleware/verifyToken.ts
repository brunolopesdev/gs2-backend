import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

// Extend the Request interface to include userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtem o token do header

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Armazenar os dados decodificados do token no objeto req para uso posterior
    req.userId = (decoded as { id: number }).id;
    next();
  });
};
