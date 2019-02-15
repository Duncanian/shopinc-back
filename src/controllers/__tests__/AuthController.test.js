import request from 'supertest';
import app from '../../app';
import user, { userExist } from '../__mocks__/mockData';
import models from '../../database/models';

describe('Sign up user', () => {
  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.User.bulkCreate(userExist);
  });
  afterAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  it('Should check if username is empty', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user1)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Kindly fill all fields in order to sign up');
        if (err) return done();
        done();
      });
  });

  it('Should check if email is empty', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Kindly fill all fields in order to sign up');
        if (err) return done();
        done();
      });
  });

  it('Should check if password is empty', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user3)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Kindly fill all fields in order to sign up');
        if (err) return done();
        done();
      });
  });

  it('Should check if username is less than three char', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user4)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Username should have at least 3 letters');
        if (err) return done();
        done();
      });
  });

  it('Should check if email is in user@mail.com format', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user5)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Email should have the format user@mail.com');
        if (err) return done();
        done();
      });
  });

  it('Should check if password has letters', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user6)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Password should contain capital and small letters, numbers and special characters e.g. @,#,!');
        if (err) return done();
        done();
      });
  });

  it('Should check if user exists', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(userExist[0])
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Sorry, a user with the email test@test.com already exists');
        if (err) return done();
        done();
      });
  });

  it('Should signup user', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Content-Type', 'application/json')
      .send(user.user7)
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).toBeTruthy();
        expect(res.body.message).toEqual('User created successfully');
        if (err) return done();
        done();
      });
  });
});
