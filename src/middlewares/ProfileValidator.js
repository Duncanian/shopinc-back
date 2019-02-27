import models from '../database/models';
import reqResponses from '../helpers/Responses';

let message;

class ProfileValidator {
  static async validateGetProfile(req, res, next) {
    try {
      const { id } = req.params;
      const userExists = await models.User.findOne({
        where: { id },
      });
      if (!userExists) {
        message = 'Sorry, the user doesn\'t exist';
        return reqResponses.handleError(message, 400, res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }

  static async validateEditProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const userExists = await models.User.findOne({
        where: { id },
      });
      if (!userExists) {
        message = 'Sorry, the user doesn\'t exist';
        return reqResponses.handleError(message, 400, res);
      }
      if (!username) {
        message = 'Username is required';
        return reqResponses.handleError(message, 400, res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }
}

export default ProfileValidator;
