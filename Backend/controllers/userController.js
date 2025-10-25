import User from '../models/user.model.js';

// Get current user info
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user budget
export const getBudget = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('budget');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ budget: user.budget || 10000 });
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user budget
export const updateBudget = async (req, res) => {
  try {
    const { budget } = req.body;
    
    if (typeof budget !== 'number' || budget < 0) {
      return res.status(400).json({ message: 'Invalid budget value' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { budget },
      { new: true }
    ).select('budget');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'Budget updated', budget: user.budget });
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
