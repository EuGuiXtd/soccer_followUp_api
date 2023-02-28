import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import Teams from '../interfaces/team.interface';

class TeamService {
  public model: ModelStatic<Team> = Team;

  public async getAll(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Teams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

export default TeamService;
