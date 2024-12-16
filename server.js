import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import transactionRouter from './routes/transactions.js';
const app = express();
const port = process.env.PORT || 3000;

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/transactions', transactionRouter);

// error handler middleware
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
