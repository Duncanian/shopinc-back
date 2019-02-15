import authRouter from './auth';

const apiPrefix = '/api/v1';

const route = (app) => {
  app.use(apiPrefix, authRouter);
};

export default route;
