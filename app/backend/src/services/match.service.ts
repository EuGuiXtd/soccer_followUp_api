import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Matches from '../interfaces/match.interface';
import Team from '../database/models/TeamModel';
import Res from '../interfaces/res.interface';

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

  async attMatch(id: number): Promise<Res> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async attMatchScore(id: number, homeGoals: number, awayGoals: number): Promise<Res> {
    await this.model.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
    return { message: 'Finished' };
  }
}

export default MatchService;
