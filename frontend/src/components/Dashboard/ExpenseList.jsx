import { Button, Card } from '@radix-ui/themes';
import { Trash2, Receipt } from 'lucide-react';
import { toast } from 'sonner';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const handleDelete = (id) => {
    onDeleteExpense(id);
    toast.success('Expense deleted');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-500',
      'Transportation': 'bg-blue-500',
      'Shopping': 'bg-pink-500',
      'Entertainment': 'bg-purple-500',
      'Bills & Utilities': 'bg-yellow-500',
      'Healthcare': 'bg-red-500',
      'Education': 'bg-green-500',
      'Travel': 'bg-cyan-500',
      'Other': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <Card>
      <div>
        <h1 className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Recent Expenses
        </h1>
      </div>
      <div>
        {expenses.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Receipt className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No expenses yet. Add your first expense above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg ${getCategoryColor(expense.category)} flex items-center justify-center`}>
                    <span className="text-lg font-bold text-white">₹</span>
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{expense.category}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold">₹{expense.amount.toFixed(2)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExpenseList;
