const debug = require('debug');
const app = require('./app');

const logger = debug('log');

app.listen(4000, () => {
  logger('Magic happening at port 4000');
});
