import request from 'supertest';
import app from '../../app';
import user, { userExist, userLogin } from '../__mocks__/authController';
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
        expect(res.body.user.username).toEqual('tester');
        expect(typeof res.body.token === 'string').toBe(true);
        if (err) return done();
        done();
      });
  });
});

describe('Test login functionality', () => {
  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.User.bulkCreate(userExist);
  });
  afterAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  it('Should handle non-existent user', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Content-Type', 'application/json')
      .send(userLogin.user1)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Sorry, you don\'t have an account. Kindly sign up');
        if (err) return done();
        done();
      });
  });

  it('Should handle wrong user password', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Content-Type', 'application/json')
      .send(userLogin.user2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Sorry, incorrect password!');
        if (err) return done();
        done();
      });
  });

  it('Should handle missing fileds', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Content-Type', 'application/json')
      .send(userLogin.user3)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).toEqual(false);
        expect(res.body.error).toEqual('Kindly enter both email and password fields');
        if (err) return done();
        done();
      });
  });

  it('Should handle correct login', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Content-Type', 'application/json')
      .send(userLogin.user4)
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Login successful!');
        expect(res.body.user.username).toEqual('tester');
        expect(typeof res.body.token === 'string').toBe(true);
        if (err) return done();
        done();
      });
  });
});
