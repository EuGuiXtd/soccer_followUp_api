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
}

export default MatchController;
