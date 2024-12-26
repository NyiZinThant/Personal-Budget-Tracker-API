import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface Category {
  id: string;
  name: string;
}
// select all categories from the database
const getCategories = async () => {
  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    throw error;
  }
};

export default { getCategories };
