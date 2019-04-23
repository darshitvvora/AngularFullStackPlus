const request = require('supertest');
const app = require('../../app');

describe('GET /', () => {
  it('return category reports', (done) => {
    request(app)
      .get('/api/users?access_token=1525f7a9b93de90190c07dc137791d44afbc383f')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        done();
      });
  });
});
