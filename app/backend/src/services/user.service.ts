import { ModelStatic } from 'sequelize';
import User from '../database/models/UserModel';
import Token from '../interfaces/token.interfaces';
import GenerateToken from '../Utils/GenerateToken';

class UserService {
  public model: ModelStatic<User> = User;
  constructor(

    private generateToken = new GenerateToken(),
  ) { }

  public async login(email: string, password: string): Promise<Token | null> {
    const payload = {
      email,
    };
    const Tokens = this.generateToken.Token(payload);
    const user = await this.model.findOne({ where: { email, password } });
    console.log(user);
    return { token: Tokens };
  }
}

export default UserService;
