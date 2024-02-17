import { NextFunction, Request, Response } from "express";

export default async function errMiddleWare(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.messge, "error in herror handler");

  
}
