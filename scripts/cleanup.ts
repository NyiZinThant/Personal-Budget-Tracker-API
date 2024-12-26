import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cleanUpTodo = async () => {
  try {
    await prisma.transactions.deleteMany();
    console.log('Transactions table cleanup success.');
    await prisma.users.deleteMany();
    console.log('Users table cleanup success.');
    await prisma.users.deleteMany();
    console.log('Categories table cleanup success.');
    process.exit(1);
  } catch (error) {
    console.error('Cleanup database error: ', error);
    process.exit(1);
  }
};

cleanUpTodo();
