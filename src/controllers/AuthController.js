import models from '../database/models';
import reqResponses from '../helpers/Responses';
import encPass from '../helpers/Encrypt';

class AuthController {
  static async RegisterUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPass = encPass.generateHash(password);
      const registeredUser = await models.User.create({
        username,
        email,
        password: hashedPass,
      });

      const message = [201, 'User created successfully', true];
      reqResponses.handleSuccess(res, message, registeredUser);
    } catch (error) {
      reqResponses.handleError(error.toString(), 500, res);
    }
  }
}

export default AuthController;
