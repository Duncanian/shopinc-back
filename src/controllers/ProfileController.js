import models from '../database/models';
import responses from '../helpers/Responses';

class UserProfile {
  static async getUserProfile(req, res) {
    try {
      const { id } = req.params;
      const userProfile = await models.User.findOne({
        where: { id },
        include: [
          {
            model: models.Profile,
            attributes: ['bio', 'image'],
            as: 'userProfile',
            // through: { attributes: [] },
          },
        ],
      });
      const message = [200, 'User retrieved successfully', true];
      responses.handleSuccess(res, message, userProfile);
    } catch (error) {
      responses.handleError(error.toString(), 500, res);
    }
  }

  static async editUserProfile(req, res) {
    try {
      const { id } = req.params;
      const { username, bio, image } = req.body;

      await models.Profile.update({ bio, image }, {
        where: { userId: id },
      });
      await models.User.update({ username }, {
        where: { id },
      });
      const updatedUser = await models.User.findOne({
        where: { id },
        include: [
          {
            model: models.Profile,
            attributes: ['bio', 'image'],
            as: 'userProfile',
            // through: { attributes: [] },
          },
        ],
      });
      const message = [200, 'User retrieved successfully', true];
      responses.handleSuccess(res, message, updatedUser);
    } catch (error) {
      responses.handleError(error.toString(), 500, res);
    }
  }
}

export default UserProfile;
