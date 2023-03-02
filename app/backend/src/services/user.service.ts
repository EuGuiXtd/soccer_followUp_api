import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import Token from '../interfaces/token.interfaces';
import GenerateToken from '../Utils/GenerateToken';
import Role from '../interfaces/role.interface';
/* import Password from '../interfaces/password.interface'; */

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
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const _password = user?.password || '';
    const validate = await bcrypt.compare(password, _password);
    if (validate === false) {
      return null;
    }
    return { token: Tokens };
  }

  public async getUserRole(email: string): Promise<Role> {
    const user = await this.model.findOne({ where: { email } });
    const role = user?.role || '';
    return { role };
  }
}

export default UserService;
