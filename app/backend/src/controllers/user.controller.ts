import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    return res.status(200).json(token);
  };
}

export default UserController;
