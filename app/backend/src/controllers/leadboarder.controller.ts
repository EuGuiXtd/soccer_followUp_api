import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import MatchService from '../services/match.service';
import Teams from '../interfaces/team.interface';
/* import leadboarder from '../interfaces/learderBoarder.interface'; */

class LeardboarderController {
  constructor(
    private teamService = new TeamService(),
    private matchService = new MatchService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const team = await this.teamService.getById(id);
    res.status(200).json(team);
  };

  defaultTeamBoard = (team: any) => (
    {
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    });

  countEfficiency = (P: number, J: number) => ((P / (J * 3)) * 100).toFixed(2);

  comparar = (a: any, b: any) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  };

  processMatch = (match: any, homeTeam: any, awayTeam: any) => {
    const retHomeTeam = homeTeam; const retawayTeam = awayTeam;
    retHomeTeam.totalGames += 1; retawayTeam.totalGames += 1;
    retHomeTeam.goalsFavor += match.homeTeamGoals; retawayTeam.goalsFavor += match.awayTeamGoals;
    retHomeTeam.goalsOwn += match.awayTeamGoals; retawayTeam.goalsOwn += match.homeTeamGoals;
    retHomeTeam.goalsBalance = retHomeTeam.goalsFavor - retHomeTeam.goalsOwn;
    retawayTeam.goalsBalance = retawayTeam.goalsFavor - retawayTeam.goalsOwn;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      retHomeTeam.totalVictories += 1; retawayTeam.totalLosses += 1; retHomeTeam.totalPoints += 3;
    } if (match.awayTeamGoals > match.homeTeamGoals) {
      retawayTeam.totalVictories += 1; retHomeTeam.totalLosses += 1; retawayTeam.totalPoints += 3;
    } if (match.awayTeamGoals === match.homeTeamGoals) {
      retawayTeam.totalDraws += 1; retHomeTeam.totalDraws += 1;
      retawayTeam.totalPoints += 1; retHomeTeam.totalPoints += 1;
    }
    retHomeTeam.efficiency = this.countEfficiency(retHomeTeam.totalPoints, retHomeTeam.totalGames);
    retawayTeam.efficiency = this.countEfficiency(retawayTeam.totalPoints, retawayTeam.totalGames);
  };

  processMatchHome = (match: any, homeTeam: any) => {
    const retHomeTeam = homeTeam;
    retHomeTeam.totalGames += 1;
    retHomeTeam.goalsFavor += match.homeTeamGoals;
    retHomeTeam.goalsOwn += match.awayTeamGoals;
    retHomeTeam.goalsBalance = retHomeTeam.goalsFavor - retHomeTeam.goalsOwn;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      retHomeTeam.totalVictories += 1; retHomeTeam.totalPoints += 3;
    } if (match.awayTeamGoals > match.homeTeamGoals) {
      retHomeTeam.totalLosses += 1;
    } if (match.awayTeamGoals === match.homeTeamGoals) {
      retHomeTeam.totalDraws += 1;
      retHomeTeam.totalPoints += 1;
    }
    retHomeTeam.efficiency = this.countEfficiency(retHomeTeam.totalPoints, retHomeTeam.totalGames);
  };

  processMatchAway = (match: any, awayTeam: any) => {
    const retawayTeam = awayTeam;
    retawayTeam.totalGames += 1;
    retawayTeam.goalsFavor += match.awayTeamGoals;
    retawayTeam.goalsOwn += match.homeTeamGoals;
    retawayTeam.goalsBalance = retawayTeam.goalsFavor - retawayTeam.goalsOwn;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      retawayTeam.totalVictories += 1; retawayTeam.totalPoints += 3;
    } if (match.awayTeamGoals < match.homeTeamGoals) {
      retawayTeam.totalLosses += 1;
    } if (match.awayTeamGoals === match.homeTeamGoals) {
      retawayTeam.totalDraws += 1;
      retawayTeam.totalPoints += 1;
    }
    retawayTeam.efficiency = this.countEfficiency(retawayTeam.totalPoints, retawayTeam.totalGames);
  };

  leaderboardAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAllFiltered(false);
    const teams = await this.teamService.getAll();
    const teamsRet = teams.map((team) => this.defaultTeamBoard(team));
    matches.forEach((match) => {
      const homeTeam = teamsRet.find((team) => (team.name === (match.homeTeam as Teams).teamName));
      const awayTeam = teamsRet.find((team) => (team.name === (match.awayTeam as Teams).teamName));
      this.processMatch(match, homeTeam, awayTeam);
    });
    return res.status(200).json(teamsRet.sort(this.comparar));
  };

  leaderboardHome = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAllFiltered(false);
    const teams = await this.teamService.getAll();
    const teamsRet = teams.map((team) => this.defaultTeamBoard(team));
    matches.forEach((match) => {
      const homeTeam = teamsRet.find((team) => (team.name === (match.homeTeam as Teams).teamName));
      this.processMatchHome(match, homeTeam);
    });
    return res.status(200).json(teamsRet.sort(this.comparar));
  };

  leaderboardAway = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAllFiltered(false);
    const teams = await this.teamService.getAll();
    const teamsRet = teams.map((team) => this.defaultTeamBoard(team));
    matches.forEach((match) => {
      const awayTeam = teamsRet.find((team) => (team.name === (match.awayTeam as Teams).teamName));
      this.processMatchAway(match, awayTeam);
    });
    return res.status(200).json(teamsRet.sort(this.comparar));
  };
}

export default LeardboarderController;
