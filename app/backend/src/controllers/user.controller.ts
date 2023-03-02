import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    if (token === null) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(token);
  };

  public getUserRole = async (req: Request, res: Response) => {
    const token = req.header('authorization') || '';
    const decoded = jwt.decode(token);
    const { email } = (decoded as jwt.JwtPayload);
    const role = await this.userService.getUserRole(email);
    return res.status(200).json(role);
  };
}

export default UserController;
