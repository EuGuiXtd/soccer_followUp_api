import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matches } from './mocks/matchs.mock';

import { app } from '../app';
import MatchService from '../services/match.service';

import { Response } from 'superagent';
import { doesNotMatch } from 'assert';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a função getAll das camadas controller e service de match', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new MatchService, 'getAll')
      .resolves(matches);
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).get('/matches').query({inProgress: true})

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.an('array');
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).get('/matches')

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.deep.equal(matches);
  })
});