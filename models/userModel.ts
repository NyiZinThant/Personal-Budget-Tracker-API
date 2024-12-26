import bcrypt from 'bcrypt';
import { Gender, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface User {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  password: string;
}
// select all categories from the database
const saltRounds = process.env.SALT_ROUND ? +process.env.SALT_ROUND : 10;
const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
const addUser = async (
  fullName: string,
  email: string,
  dob: Date,
  gender: Gender,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.users.create({
      data: {
        full_name: fullName,
        email: email,
        dob: dob,
        gender: gender,
        password: hashedPassword,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        dob: true,
        gender: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export default { getUserByEmail, addUser };
