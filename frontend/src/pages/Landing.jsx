import { Link } from 'react-router-dom';
import { Button, Card } from '@radix-ui/themes';
import { Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex flex-col">
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Expense Tracker</h2>
        </div>

        <nav className="flex items-center gap-3">
          <Link to="/signup" className="text-sm text-muted-foreground hover:underline">Sign up</Link>
          <Link to="/login" className="text-sm text-primary font-medium">Log in</Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <section className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Track your spending. Reach your goals.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Simple, secure expense tracking with categories, reports and seamless sync across devices.
              Sign up in seconds and take control of your finances.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {user ? (
                <Link to="/dashboard">
                  <Button variant="accent" className="px-6">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="accent" className="px-6">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="ghost" className="px-6">
                      Sign in
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="font-medium">Add Transactions</h4>
                <p className="text-sm text-muted-foreground">Quickly add and categorize expenses</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium">Reports</h4>
                <p className="text-sm text-muted-foreground">Visualize spending by category and time</p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium">Secure</h4>
                <p className="text-sm text-muted-foreground">Your data stays private and local (or synced via your API)</p>
              </Card>
            </div>
          </section>

          <aside className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg p-3 bg-white/60">
                    <Wallet className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly summary</p>
                    <h3 className="text-2xl font-semibold">₹1,254</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Groceries</span>
                    <span className="font-medium">₹420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Transport</span>
                    <span className="font-medium">₹132</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subscriptions</span>
                    <span className="font-medium">₹82</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">This preview is static — connect your backend to show real data.</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full border-t bg-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Expense Tracker</p>
          <div className="flex gap-3 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:underline">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;