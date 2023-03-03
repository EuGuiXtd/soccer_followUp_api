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

describe('Testa a função attMatch das camadas controller e service de match', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new MatchService, 'attMatch')
      .resolves({ message: 'Finished' });
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).patch('/matches/1/finish').set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3Nzg1MjYwNH0.bMVxI-v8zfLW3z-h5u5DK2F-Jy_mhLkjW_EB-8nT_aI')

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.deep.equal({ message: 'Finished' });
  })
});

describe('Testa a função attMatchScore das camadas controller e service de match', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new MatchService, 'attMatchScore')
      .resolves({ message: 'Finished' });
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).patch('/matches/1').set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3Nzg1MjYwNH0.bMVxI-v8zfLW3z-h5u5DK2F-Jy_mhLkjW_EB-8nT_aI')

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.deep.equal({ message: 'Finished' });
  })
});
