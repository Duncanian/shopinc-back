import express from 'express';
import AuthController from '../controllers/AuthController';
import UserValidators from '../middlewares/UserValidators';

const Router = express.Router();

Router.post(
  '/signup',
  UserValidators.validateSignup,
  AuthController.RegisterUser,
);

Router.post(
  '/signin',
  UserValidators.validateSignin,
  AuthController.LoginUser,
);

export default Router;
