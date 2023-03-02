import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teams } from './mocks/teams.mock';

import { app } from '../app';
import TeamService from '../services/team.service';

import { Response } from 'superagent';
import { doesNotMatch } from 'assert';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a função getAll das camadas controller e service de team', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new TeamService, 'getAll')
      .resolves(teams);
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).get('/teams')

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.deep.equal(teams);
  })
});

describe('Testa a função getById das camadas controller e service de team', () => {

  it('Retorna corretamente as informações para o GET em /teams/:id', async () => {
    let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new TeamService, 'getById')
      .resolves(teams[0]);
  });
  afterEach(()=>{
    sinon.restore();
  })

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams[0]);
  });
});

