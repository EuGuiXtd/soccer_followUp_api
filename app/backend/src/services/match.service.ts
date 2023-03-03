import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Matches from '../interfaces/match.interface';
import Team from '../database/models/TeamModel';
import Res from '../interfaces/res.interface';
import CreateMatch from '../interfaces/createMatch.interface';
import TeamService from './team.service';

class MatchService {
  constructor(private teamService = new TeamService()) { }
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

  async createMatch(
    _homeTeamId: number,
    _awayTeamId: number,
    _homeTeamGoals: number,
    _awayTeamGoals: number,
  ): Promise<CreateMatch | null | undefined> {
    const homeTeam = await this.model.findByPk(_homeTeamId);
    const awayTeam = await this.model.findByPk(_awayTeamId);
    if (!homeTeam || !awayTeam) {
      return undefined;
    }
    const match = await this.model.create({
      homeTeamId: _homeTeamId,
      awayTeamId: _awayTeamId,
      homeTeamGoals: _homeTeamGoals,
      awayTeamGoals: _awayTeamGoals,
      inProgress: true,
    }); if (_homeTeamId === _awayTeamId) { return null; }
    return match;
  }
}

export default MatchService;
