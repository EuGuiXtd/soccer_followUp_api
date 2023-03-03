import * as express from 'express';
import TeamController from './controllers/team.controller';
import UserController from './controllers/user.controller';
import MiddlewareLogin from './middlewares/login.middlewares';
import ValidateJWT from './middlewares/validateJWT';
import MatchController from './controllers/matche.controller';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    const teamController = new TeamController();
    const userController = new UserController();
    const matchController = new MatchController();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', teamController.getAll);
    this.app.get('/teams/:id', teamController.getById);
    this.app.post('/login', MiddlewareLogin.validateLogin, userController.login);
    this.app.get('/login/role', ValidateJWT.validateJWT, userController.getUserRole);
    this.app.get('/matches', matchController.getAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
