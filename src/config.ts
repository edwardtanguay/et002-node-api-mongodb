import dotenv from 'dotenv';

dotenv.config();

// const { PORT = 3000 } = process.env;
export const port = process.env.PORT || 3000;
export const logPathAndFileName = './src/logs/log.txt';

export const mongoDbConnection = 'mongodb://localhost:27017';