import { Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: "",
  });
};

export default notFound as (req: Request, res: Response) => void;
