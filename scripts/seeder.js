import { faker } from '@faker-js/faker';
import db from '../config/database.js';
const incomeCategories = [
  'Salary/Wages',
  'Freelance/Contract Income',
  'Business Revenue',
  'Investments',
  'Dividends',
  'Capital Gains',
  'Rental Income',
  'Royalties',
  'Gifts/Donations Received',
  'Pension/Retirement Income',
  'Social Security',
  'Bonuses',
  'Grants/Scholarships',
  'Tax Refunds',
  'Side Hustle/Part-Time Work',
  'Stock Dividends',
  'Interest Income (Savings/Fixed Deposits)',
  'Cryptocurrency Earnings',
  'Mutual Fund Payouts',
  'Product Sales',
  'Service Revenue',
  'Consultation Fees',
  'Project Milestone Payments',
  'Lottery Winnings',
  'Inheritance',
  'Insurance Payouts',
  'Refunds (Overpayments, Utility, etc.)',
  'Found Money',
  'Affiliate Marketing Revenue',
  'Ad Revenue (YouTube, Blogs)',
  'Streaming Income (Twitch, Patreon)',
  'E-commerce Sales',
  'Crowdfunding Contributions',
  'Miscellaneous',
];
const expenseCategories = [
  'Rent',
  'Utilities',
  'Groceries',
  'Transportation',
  'Entertainment',
  'Dining Out',
  'Health & Fitness',
  'Insurance',
  'Travel',
  'Shopping',
  'Education',
  'Subscriptions',
  'Debt Payments',
  'Childcare',
  'Household Supplies',
  'Gifts & Donations',
  'Pet Care',
  'Personal Care',
  'Miscellaneous',
  'other',
];
const seedIncomeCategories = async () => {
  const result = [];
  try {
    console.log('Income categories start seeding.');
    for (let category of incomeCategories) {
      const id = faker.string.uuid();
      const name = category;
      await db.query(
        'INSERT INTO categories(id, name, type) VALUES (?, ?, ?)',
        [id, name, 'Income']
      );
      result.push(id);
    }
    console.log('Income categories seeded successfully.');
    return result;
  } catch (error) {
    console.error('Error seeding income categories: ', error);
    process.exit(1);
  }
};
const seedExpenseCategories = async () => {
  const result = [];
  try {
    console.log('Expense categories start seeding.');
    for (let category of expenseCategories) {
      const id = faker.string.uuid();
      const name = category;
      await db.query(
        'INSERT INTO categories(id, name, type) VALUES (?, ?, ?)',
        [id, name, 'Expense']
      );
      result.push(id);
    }
    console.log('Expense categories seeded successfully.');
    return result;
  } catch (error) {
    console.error('Error seeding expense categories: ', error);
    process.exit(1);
  }
};

const seedTransactions = async (
  incomeCategoriesId,
  ExpenseCategoriesId,
  numIncome,
  numExpense
) => {
  try {
    console.log('Income transactions start seeding.');
    for (let i = 0; i < numIncome; i++) {
      const id = faker.string.uuid();
      const description = faker.lorem.sentence();
      const amount = faker.finance.amount({ min: 1000, max: 100000, dec: 2 });
      const type = 'Income';
      const categoryId = faker.helpers.arrayElement(incomeCategoriesId);
      const transactionDate = faker.date.between({
        from: new Date('2020-1-1'),
        to: new Date(),
      });
      await db.query(
        'INSERT INTO transactions(id, description, amount, type, category_id, transaction_date) VALUES (?, ?, ?, ?, ?, ?)',
        [id, description, amount, type, categoryId, transactionDate]
      );
    }
    console.log('Income transactions seeded successfully.');
  } catch (error) {
    console.error('Error seeding income transactions: ', error);
    process.exit(1);
  }
  try {
    console.log('Expense transactions start seeding.');
    for (let i = 0; i < numExpense; i++) {
      const id = faker.string.uuid();
      const description = faker.lorem.sentence();
      const amount = faker.finance.amount({ min: 10, max: 10000, dec: 2 });
      const type = 'Expnese';
      const categoryId = faker.helpers.arrayElement(ExpenseCategoriesId);
      const transactionDate = faker.date.between({
        from: new Date('2020-1-1'),
        to: new Date(),
      });
      await db.query(
        'INSERT INTO transactions(id, description, amount, type, category_id, transaction_date) VALUES (?, ?, ?, ?, ?, ?)',
        [id, description, amount, type, categoryId, transactionDate]
      );
    }
    console.log('Expense transactions seeded successfully.');
  } catch (error) {
    console.error('Error seeding expense transactions: ', error);
    process.exit(1);
  }
};

const incomeCategoriesId = await seedIncomeCategories();
const expenseCategoriesId = await seedExpenseCategories();
await seedTransactions(incomeCategoriesId, expenseCategoriesId, 20, 30);
process.exit(1);
