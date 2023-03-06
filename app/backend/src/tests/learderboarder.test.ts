import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import jwt = require('jsonwebtoken');
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as funções leaderboardHome, leaderboardAway e leaderboard', () => {
  const app = new App();

  afterEach(() => {
    sinon.restore();
  });

    it('Retorna corretamente as informações para o GET em /leaderboard/home', async () => {
      const response = await chai.request(app.app).get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
    });


    it('Retorna corretamente as informações para o GET em /leaderboard/away', async () => {
        const response = await chai.request(app.app).get('/leaderboard/away');

        expect(response.status).to.be.equal(200);
    })

    it('Retorna corretamente as informações para o GET em /leaderboard/away', async () => {
        const response = await chai.request(app.app).get('/leaderboard');

        expect(response.status).to.be.equal(200);
    })
  });