import * as jwt from 'jsonwebtoken';
import Payload from '../interfaces/payload.interface';

class GenerateToken {
  private secret = 'jwt_secret';

  Token(payload: Payload): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }
}

export default GenerateToken;
