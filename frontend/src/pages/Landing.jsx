import { Link } from 'react-router-dom';
import { Wallet, BarChart3, Layers, Clock, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Glass effect/feature block utility
const FeatureCard = ({ Icon, title, desc, color }) => (
  <div className={`flex gap-2 items-start p-5 rounded-2xl bg-white/60 shadow-xl border border-slate-100 hover:scale-[1.03] transition glass-effect`}>
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm leading-tight text-muted-foreground font-medium">{desc}</p>
    </div>
  </div>
);

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-sky-50 to-blue-100 flex flex-col overflow-x-hidden">
      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-lg h-128 rounded-full pointer-events-none z-0 bg-linear-to-br from-blue-300 via-purple-200 to-cyan-200 blur-2xl opacity-40 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-blue-200 to-indigo-200 blur-2xl opacity-40 animate-blob2" />

      {/* Header */}
      <div className='mx-auto w-full max-w-7xl'>
      <header className="relative z-10 flex justify-between items-center px-6 py-10">
        <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-green-200/60 shadow-lg">
                <Wallet className="h-7 w-7 text-green-600" />
            </div>
          <span>
            <strong className="text-3xl font-black tracking-tight text-blue-950">Expense Tracker</strong>
            <div className="text-s font-medium text-slate-700">Seamless finance tracking</div>
          </span>
        </div>
        <nav className="flex gap-5 items-center">
          <Link to="/privacy" className="text-gray-500 hover:text-primary">Privacy</Link>
          <Link to="/terms" className="text-gray-500 hover:text-primary">Terms</Link>
          {user
          ? <Link to="/dashboard"><button className="h-10 bg-linear-to-br from-primary to-green-800 text-white px-6 rounded-xl font-bold shadow hover:scale-105 transition">Dashboard</button></Link>
          : <>
              <Link to="/login"><button className="h-10 bg-white/90 border border-blue-100 text-primary font-bold px-5 rounded-xl hover:bg-blue-50 shadow-sm transition">Sign In</button></Link>
              <Link to="/signup"><button className="h-10 bg-linear-to-br from-green-300 to-green-800 text-white px-6 rounded-xl font-bold shadow hover:scale-105 transition">Get Started</button></Link>
            </>}
        </nav>
      </header>
      </div>

      {/* Main Hero */}
      <main className="flex-1 relative z-10 flex flex-col md:flex-row gap-16 max-w-7xl mx-auto px-6 pt-8 items-center justify-center">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-start justify-center gap-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
              Your <span className="text-green-700">expenses</span>.<br/>
              <span className="bg-linear-to-br from-sky-400 to-gray-800 text-transparent bg-clip-text italic">Under control.</span>
            </h1>
            <p className="mt-4 text-xl text-slate-700 font-medium max-w-xl">
              Modern finance made simple. Track your spends, visualize habits, and reach your goals with clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {user
              ? <Link to="/dashboard"><button className="bg-linear-to-br from-blue-500 to-sky-400 px-7 py-3 text-base text-white font-bold rounded-lg shadow-lg hover:scale-105 transition">Open Dashboard</button></Link>
              : <>
                  <Link to="/signup"><button className="bg-linear-to-br from-green-400 to-green-800 px-7 py-3 text-base text-white font-bold rounded-lg shadow-lg hover:scale-105 transition">Get started free</button></Link>
                  <Link to="/login"><button className="bg-white border border-slate-300 px-7 py-3 text-base text-primary font-bold rounded-lg hover:bg-blue-50 shadow transition">Sign in</button></Link>
                </>
            }
          </div>
          {/* Animated Student Card Mockup */}
          <div className="py-8 flex items-center gap-6">
            <div className="flex gap-6">
              <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-100 via-blue-50 to-pink-50 shadow-lg border border-blue-200 backdrop-blur-lg bg-white/70 flex flex-col items-center w-44 relative">
                <CreditCard className="h-7 w-7 mb-2 text-primary" />
                <span className="font-bold text-2xl">&#8377;2,100</span>
                <div className="text-xs text-indigo-700 font-bold mt-2">Saved this month</div>
              </div>
              <div className="rounded-xl p-6 bg-linear-to-br from-indigo-100 via-blue-50 to-pink-50 shadow-lg border border-blue-200 flex flex-col items-center w-40" style={{ opacity: 0.85 }}>
                <div className="text-xs font-bold text-indigo-700 mt-2">Top Categories</div>
                <table className="mt-3 w-full text-xs">
                  <tbody>
                    <tr><td>Food</td><td className="text-right font-bold">₹424</td></tr>
                    <tr><td>Books</td><td className="text-right font-bold">₹261</td></tr>
                    <tr><td>Transport</td><td className="text-right font-bold">₹99</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="font-mono text-4xl font-extrabold text-indigo-700">+10%</div>
              <div className="text-sm text-indigo-700 font-semibold">More saved<br/>vs last month</div>
            </div>
          </div>
        </section>
        {/* Preview & Features */}
        <aside className="flex-1 flex flex-col gap-5">
          <div className="flex gap-3">
            <FeatureCard Icon={BarChart3} title="Insightful Reports" desc="Interactive graphs, timeline drill-down, and spending trends." color="bg-blue-100 text-indigo-600" />
            <FeatureCard Icon={Clock} title="Instant Add" desc="2-tap entry, everywhere." color="bg-pink-100 text-pink-600" />
          </div>
          <div className="flex gap-3">
            <FeatureCard Icon={Wallet} title="Private & Secure" desc="No data leaks, no ads, just you." color="bg-green-100 text-green-600" />
            <FeatureCard Icon={Layers} title="Smart Categories" desc="Automatic suggestions & grouping." color="bg-indigo-100 text-blue-600" />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 bg-transparent mt-auto relative z-10">
        <div className="text-sm font-medium flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center text-slate-500">
          <span>© {new Date().getFullYear()} <b>Expense Tracker</b> | Built by Apurv Dugar</span>
          <span>Connect: <a className="text-primary hover:underline" href="mailto:contact@expensetracker.com">contact@expensetracker.com</a></span>
          <a href="https://github.com/your-repo" className="text-indigo-700 hover:underline">GitHub</a>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
        </div>
      </footer>

      {/* Custom linears and effect animations */}
      <style>{`
        .glass-effect { backdrop-filter: blur(10px); }
        @keyframes blob1 { 0%,100%{transform:scale(1);} 33%{transform:scale(1.12) translateY(-12px);} 66%{transform:scale(0.95) translateX(8px);} }
        @keyframes blob2 { 0%,100%{transform:scale(1);} 25%{transform:scale(1.05) translateY(-4px);} 55%{transform:scale(0.97) translateX(-7px);} }
        .animate-blob1 { animation: blob1 18s infinite cubic-bezier(0.03,0.98,0.52,0.99);}
        .animate-blob2 { animation: blob2 18s infinite cubic-bezier(0.03,0.98,0.52,0.99);}
        .glass-effect { backdrop-filter: blur(16px) saturate(160%); background-blend-mode:soft-light; }
        html { scroll-behavior: smooth; }
        button:focus-visible, a:focus-visible { outline: 2px solid #6875f5; outline-offset: 2px; }
      `}</style>
    </div>
  );
};

export default Landing;
