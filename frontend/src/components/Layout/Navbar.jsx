import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { Button } from '@radix-ui/themes';
import { Wallet, LogOut, BarChart3, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary to-accent">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            ExpenseTracker
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/statistics">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </Button>
            </Link>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
