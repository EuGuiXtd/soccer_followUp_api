import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Matches from '../interfaces/match.interface';
import Team from '../database/models/TeamModel';

class MatchService {
  public model: ModelStatic<Match> = Match;

  async getAllFiltered(boolean: boolean | undefined | string): Promise<Matches[]> {
    const matches = await this.model.findAll({
      where: { inProgress: boolean },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async getAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}

export default MatchService;
