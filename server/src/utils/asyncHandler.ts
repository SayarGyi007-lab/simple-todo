import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const asyncHandler = (
    ControlFn: (
        req: Request | AuthRequest,
        res: Response,
        next: NextFunction
    ) => Promise<void>
) => (req: Request | AuthRequest,
    res: Response,
    next: NextFunction
) => {
        Promise.resolve(ControlFn(req, res, next)).catch(next)
    }