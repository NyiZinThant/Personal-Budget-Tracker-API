import categoryModel from '../models/categoryModel.js';

// @desc Get all categories
// @route GET /api/v1/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
export default { getCategories };
