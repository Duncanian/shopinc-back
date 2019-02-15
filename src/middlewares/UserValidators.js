import models from '../database/models';
import reqResponses from '../helpers/Responses';

let message;

class AuthValidator {
  static async validateSignup(req, res, next) {
    try {
      const { username, email, password } = req.body;

      let re;
      if (username === '' || email === '' || password === '') {
        message = 'Kindly fill all fields in order to sign up';
        return reqResponses.handleError(message, 400, res);
      }
      if (username) {
        re = /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/;
        message = 'Username should have at least 3 letters';
        if (!re.test(username)) return reqResponses.handleError(message, 400, res);
      }
      if (email) {
        re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
        message = 'Email should have the format user@mail.com';
        if (!re.test(email)) return reqResponses.handleError(message, 400, res);
      }
      if (password) {
        re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{7,}$/;
        message = 'Password should contain capital and small letters, numbers and special characters e.g. @,#,!';
        if (!re.test(password)) return reqResponses.handleError(message, 400, res);
      }

      const emailExists = await models.User.findOne({
        where: { email },
      });
      if (emailExists) {
        message = `Sorry, a user with the email ${email} already exists`;
        return reqResponses.handleError(message, 400, res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }
}

export default AuthValidator;
