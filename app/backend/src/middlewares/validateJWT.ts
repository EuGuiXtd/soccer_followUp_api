import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class MiddlewareLogin {
  public static validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization') || '';
    const secret = 'jwt_secret';

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      console.log(Object.keys(decoded as jwt.JwtPayload));
      console.log((decoded as jwt.JwtPayload).email);
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
