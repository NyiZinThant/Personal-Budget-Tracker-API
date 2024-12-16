import express from 'express';
import errorHandler from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler middleware
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
