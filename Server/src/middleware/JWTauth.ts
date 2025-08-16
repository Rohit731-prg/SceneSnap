import JWT, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
    email?: string;
  }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if ( !token ) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_CODE as string) as JwtPayload;
        if (decoded) {
            req.id = decoded.id;
            req.email = decoded.email;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}