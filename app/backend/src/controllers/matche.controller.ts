import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const _inProgress: boolean = JSON.parse(inProgress as string);
      const matches = await this.matchService.getAllFiltered(_inProgress);
      return res.status(200).json(matches);
    }
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public attMatch = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const matchStatus = await this.matchService.attMatch(id);
    return res.status(200).json(matchStatus);
  };

  public attMatchScore = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const id = Number(req.params.id);
    const matchStatus = await this.matchService.attMatchScore(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(matchStatus);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    if (match === null) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    if (match === undefined) {
      return res.status(404).json({
        message: 'There is no team with such id!' });
    }
    return res.status(201).json(match);
  };
}

export default MatchController;
