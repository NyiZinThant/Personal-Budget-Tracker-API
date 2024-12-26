import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();
export interface Transaction {
  id: string;
  description: string;
  amount: string;
  category: string;
  transaction_date: string;
}
// Select all transactions from the database
const getTransactions = async (userId: string) => {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        transaction_date: true,
        categories: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        transaction_date: 'desc',
      },
    });
    console.log(transactions);
    return transactions;
  } catch (error) {
    throw error;
  }
};

// Add new transaction to the database
const addTransaction = async (
  description: string,
  amount: number,
  type: TransactionType,
  categoryId: string,
  date: Date,
  userId: string
) => {
  try {
    const transaction = await prisma.transactions.create({
      data: {
        description: description,
        amount: amount,
        type: type,
        category_id: categoryId,
        transaction_date: date,
        user_id: userId,
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
export default { getTransactions, addTransaction };
