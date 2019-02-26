import authRouter from './auth';
import profileRouter from './profile';

const apiPrefix = '/api/v1';

const route = (app) => {
  app.use(apiPrefix, authRouter);
  app.use(apiPrefix, profileRouter);
};

export default route;
