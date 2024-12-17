import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import transactionRouter from './routes/transactions.js';
import categoryRouter from './routes/categories.js';
import cors from 'cors';
const port = process.env.PORT || 3000;
const app = express();

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());

// routes
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/categories', categoryRouter);

// error handler middleware
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
