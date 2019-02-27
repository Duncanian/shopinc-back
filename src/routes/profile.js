import express from 'express';
import ProfileValidator from '../middlewares/ProfileValidator';
import ProfileController from '../controllers/ProfileController';

const Router = express.Router();

Router.get(
  '/profile/:id',
  ProfileValidator.validateGetProfile,
  ProfileController.getUserProfile,
);

Router.patch(
  '/profile/:id/edit',
  ProfileValidator.validateEditProfile,
  ProfileController.editUserProfile,
);

export default Router;
