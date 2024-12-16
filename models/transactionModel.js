import db from './../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Select all transactions
const getTransactions = async () => {
  try {
    const [rows] = await db.query(
      'SELECT t.id, t.description, t.amount, t.type, c.name AS categroy, t.transaction_date AS date FROM transactions t JOIN categories c ON t.category_id=c.id ORDER BY t.transaction_date DESC'
    );
    return rows.map((row) => {
      return { ...row, amount: Number(row.amount) };
    });
  } catch (error) {
    throw error;
  }
};

// Add new transaction
const addTransaction = async (description, amount, type, categoryId, date) => {
  try {
    const id = uuidv4();
    await db.query(
      'INSERT INTO transactions(id, description, amount, type, category_id, transaction_date) VALUES(?, ?, ?, ?, ?, ?)',
      [id, description, amount, type, categoryId, date]
    );
  } catch (error) {
    throw error;
  }
};
export default { getTransactions, addTransaction };
