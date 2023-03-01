import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { token } from './mocks/token.mock';

import { app } from '../app';
import UserService from '../services/user.service';

import { Response } from 'superagent';
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a função login das camadas controller e service de user', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub( new UserService, 'login')
      .resolves(token);
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('Teste da controller e Service', async () => {
    const res = await chai.request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      });

    chai.expect(res.status).to.equal(200);
  })
});