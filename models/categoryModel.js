import db from '../config/database.js';

// select all categories from the database
const getCategories = async () => {
  try {
    const [rows] = await db.query('SELECT id, name, type FROM categories');
    return rows;
  } catch (error) {
    throw error;
  }
};

export default { getCategories };
