import { RowDataPacket } from 'mysql2';
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';
export interface Transaction {
  id: string;
  description: string;
  amount: string;
  category: string;
  transaction_date: string;
}
export interface TransactionRow extends RowDataPacket, Transaction {}
// Select all transactions from the database
const getTransactions = async (userId: string) => {
  try {
    const [rows] = await db.query<TransactionRow[]>(
      'SELECT t.id, t.description, t.amount, t.type, c.name AS category, t.transaction_date AS date FROM transactions t JOIN categories c ON t.category_id=c.id WHERE user_id=? ORDER BY t.transaction_date DESC',
      [userId]
    );
    return rows.map((row) => {
      return { ...row, amount: Number(row.amount) };
    });
  } catch (error) {
    throw error;
  }
};

// Add new transaction to the database
const addTransaction = async (
  description: string,
  amount: number,
  type: string,
  categoryId: string,
  date: Date,
  userId: string
) => {
  try {
    const id = uuidv4();
    console.log('add transaction called');
    const result = await db.query(
      'INSERT INTO transactions(id, description, amount, type, category_id, transaction_date, user_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [id, description, amount, type, categoryId, date, userId]
    );
  } catch (error) {
    throw error;
  }
};
export default { getTransactions, addTransaction };
