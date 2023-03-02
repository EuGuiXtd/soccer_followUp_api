import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamgoals: string;
  declare awayTeamid: string;
  declare awayTeamGoals: string;
  declare inProgress: string;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamgoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamid: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'home_team_id', as: 'homeTeam' });
Team.belongsTo(Match, { foreignKey: 'away_team_id', as: 'awayTeam' });

Match.hasMany(Team, { foreignKey: 'id', as: 'home_team_id' });
Match.hasMany(Team, { foreignKey: 'id', as: 'away_team_id' });

export default Match;
