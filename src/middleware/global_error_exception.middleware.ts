import { Request, Response, NextFunction } from "express";

export default function globalErrorExceptionMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.message === "Username or password is incorrect") {
    return res.status(401).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
