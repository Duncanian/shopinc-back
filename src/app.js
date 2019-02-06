import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('docs/swagger.yaml');

// Set up the express app
const app = express();

// Set up Swagger documentation url
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up CORS
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry, we lost you!',
}));

export default app;
