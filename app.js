import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: false}));
app.use(express.static('public'));

import {Status} from './src/api/status.js';

import authRouter from './src/api/routes/authRouter.js';
import isAuth from './src/api/middleware/isAuth.js';
import withCurrentAuth from './src/api/middleware/withCurrentAuth.js';
import userRouter from './src/api/routes/userRouter.js';
import adminRouter from './src/api/routes/adminRouter.js';
import topicRouter from './src/api/routes/topicRouter.js';
import levelRouter from './src/api/routes/levelRouter.js';
import reportRouter from './src/api/routes/reportRouter.js';
import questionRouter from './src/api/routes/questionRouter.js';
import questionDocumentRouter from './src/api/routes/questionDocumentRouter.js';
import exerciseRouter from './src/api/routes/exerciseRouter.js';
import examRouter from './src/api/routes/examRouter.js';
import courseRouter from './src/api/routes/courseRouter.js';
import generalCourseRouter from './src/api/routes/generalCourseRouter.js';

app.use(function (req, res, next) {
  console.info('REQUEST', req.method, req.url, req.body);
  next();
});


app.use('/api/auth', authRouter);
app.use('/api/levels', levelRouter);
app.use('/api/generalCourseRouter', generalCourseRouter);
app.use(isAuth);
app.use(withCurrentAuth);
app.use('/api/accounts', adminRouter);
app.use('/api/users', userRouter);
app.use('/api/topics', topicRouter);
app.use('/api/reports', reportRouter);
app.use('/api/questions', questionRouter);
app.use('/api/questionDocuments', questionDocumentRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/exams', examRouter);
app.use('/api/courses', courseRouter);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: Status.Fail,
      message: 'invalid token',
    });
  }

  console.error(err);
  if (res.headersSent) {
    next(err);
  }

  return res.send(
    {
      status: Status.Fail,
      message: 'Server Error',
    }
  );
});

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('connected to mongoose')
});

app.listen(4001);