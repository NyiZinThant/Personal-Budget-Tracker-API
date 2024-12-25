import mysql from 'mysql2/promise';
const url = process.env.MYSQL_URL || '';
// mysql database connection
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(url);
    return connection;
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};
const db = await connectToDatabase();
export default db;
