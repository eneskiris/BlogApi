import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express";

type AsyncHandlerFunction = (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export function asyncHandler(fn: AsyncHandlerFunction) {
  return async function (
    req: Request | AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
