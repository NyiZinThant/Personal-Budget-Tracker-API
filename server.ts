import express from 'express';
import errorHandler from './middlewares/errorHandler';
import transactionRouter from './routes/transactions';
import categoryRouter from './routes/categories';
import authRouter from './routes/auth';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware';
const port = process.env.PORT || 3000;
const app = express();

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());

// routes
// app.use('/api/v1/transactions', authMiddleware);
app.use('/api/v1/transactions', authMiddleware, transactionRouter);
app.use('/api/v1/categories', authMiddleware, categoryRouter);
app.use('/api/v1/', authRouter);
// error handler middleware
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
