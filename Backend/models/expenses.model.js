import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const expenseSchema = new Schema({
  amount: Number,
  category: String,
  description: String,
  user: { type: ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

const ExpenseModel = mongoose.model("Expense", expenseSchema);
export default ExpenseModel;