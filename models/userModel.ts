import db from '../config/database.js';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
export interface User {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  password: string;
}
export interface UserRow extends RowDataPacket, User {}
// select all categories from the database
const saltRounds = process.env.SALT_ROUND ? +process.env.SALT_ROUND : 10;
const getUserByEmail = async (email: string) => {
  try {
    const [rows] = await db.query<UserRow[]>(
      'SELECT id, full_name AS fullName, email, gender, dob, password FROM users WHERE email=?',
      [email]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
const addUser = async (
  fullName: string,
  email: string,
  dob: Date,
  gender: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const id = uuidv4();
    await db.query(
      'INSERT INTO users(id, full_name, email, dob, gender, password) VALUES(?, ?, ?, ?, ?, ?)',
      [id, fullName, email, dob, gender, hashedPassword]
    );
  } catch (error) {
    throw error;
  }
};
export default { getUserByEmail, addUser };
