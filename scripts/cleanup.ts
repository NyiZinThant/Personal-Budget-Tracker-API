import db from '../config/database.js';

const cleanUpTodo = async () => {
  try {
    await db.query('DELETE FROM transactions');
    console.log('Transactions table cleanup success.');
    await db.query('DELETE FROM users');
    console.log('Users table cleanup success.');
    await db.query('DELETE FROM categories');
    console.log('Categories table cleanup success.');
    process.exit(1);
  } catch (error) {
    console.error('Cleanup database error: ', error);
    process.exit(1);
  }
};

cleanUpTodo();
