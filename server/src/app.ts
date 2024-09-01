import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songs';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/songdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

app.use('/api/songs', songRoutes);

export default app;