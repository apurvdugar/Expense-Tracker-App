import { useState } from 'react';
import { Button, Card, Select } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
];

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString()
    };

    onAddExpense(newExpense);
    toast.success('Expense added successfully!');
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <Card>
      <div >
        <h1 className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Expense
        </h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (₹)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select.Root value={category} onValueChange={setCategory} required>
                <Select.Trigger id="category">
                  <Select.Value placeholder="Select category" />
                </Select.Trigger>
                <Select.Content>
                  {CATEGORIES.map((cat) => (
                    <Select.Item key={cat} value={cat}>
                      {cat}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ExpenseForm;
