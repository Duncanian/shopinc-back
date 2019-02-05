import request from 'supertest';
import app from './app';

describe('Testing route', () =>
  it('Wrong url', (done) => {
    request(app)
      .get('/wrong')
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).toEqual('Sorry, we lost you!');
        if (err) return done();
        done();
      });
  }));
