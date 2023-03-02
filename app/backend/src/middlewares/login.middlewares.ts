import { Request, Response, NextFunction } from 'express';

export default class MiddlewareLogin {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    /* const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g; */

    if (!email || !password) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    /*  if (password.length < 6 || !regex.test(email)) {
      return res.status(401).send({ message: 'Invalid email or password' });
    } */

    next();
  }
}
