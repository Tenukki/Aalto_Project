import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGOURL } from './utils/config';
import EventRouter from './controllers/Events';
import IndexRouter from './controllers/Index'
import requestLogger from './middleware/requestlogger';
const app = express();
const connURL = MONGOURL as string;

mongoose.connect(connURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch((e: Error) => {
    console.log('Error connecting,', e.message);
  });

app.use(cors({
  credentials: true,
}));

app.use(requestLogger);
app.use(express.json());

app.use('/api/events', EventRouter);
app.use('/', IndexRouter);

export default app;

