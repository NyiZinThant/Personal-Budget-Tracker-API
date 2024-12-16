import mysql from 'mysql2/promise';

// mysql database connection
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
    });
    return connection;
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};
const db = await connectToDatabase();
export default db;
