import logger from './logger';
import app from './app';
import config from './config';
import connectToDatabase from './database/connection';

const PORT = config.port || 8080;

const db = connectToDatabase();
export default db;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
