import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class ValidationMiddleWare{
    handleValidationError(req: Request, res: Response, next: NextFunction) {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json(error);
        }
        next();
    }
}

export default new ValidationMiddleWare();