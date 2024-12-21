import db from '../config/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
// select all categories from the database
const saltRounds = +process.env.SALT_ROUND || 10;
const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
    return rows;
  } catch (error) {
    throw error;
  }
};
const addUser = async (fullName, email, dob, gender, password) => {
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
