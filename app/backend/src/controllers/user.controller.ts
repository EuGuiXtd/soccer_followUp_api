import { Request, Response } from 'express';
import UserService from '../services/user.service';
import GenerateToken from '../Utils/GenerateToken';

class UserController {
  constructor(
    private userService = new UserService(),
    private generateToken = new GenerateToken(),
  ) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    res.status(200).json(token);
  };
}

export default UserController;
