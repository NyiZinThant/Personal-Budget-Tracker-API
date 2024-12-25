import { RowDataPacket } from 'mysql2';
import db from '../config/database';
export interface Category {
  id: string;
  name: string;
}
export interface CategoryRow extends RowDataPacket, Category {}
// select all categories from the database
const getCategories = async () => {
  try {
    const [rows] = await db.query<CategoryRow[]>(
      'SELECT id, name, type FROM categories'
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

export default { getCategories };
