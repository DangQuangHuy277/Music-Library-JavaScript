const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('GET /', () => {
  it('responds with a 404 and error message in json', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(404);
    res.should.have.header('content-type', 'application/json; charset=utf-8');
  });
});
