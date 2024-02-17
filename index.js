import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './src/routes.js';

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("API Rest Guna Studio");s
});

app.use('/api', routes);

app.listen(process.env.PORT);

export default app;