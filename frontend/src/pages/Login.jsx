import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CloudCog, Wallet } from "lucide-react";
import axios from "axios";

const Login = () => {
  const API = "https://expense-tracker-app-backend-1.onrender.com" ;
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/api/auth/signin`, form, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 flex flex-col overflow-x-hidden">
      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-35 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-30 animate-blob2" />
      
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
      </header>
      </div>

      {/* Centered Glassy Login Box */}
      <main className="flex-1 flex items-start justify-center z-10">
        <form
          className="relative max-w-md w-full mt-4 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-8 flex flex-col items-stretch gap-6 glass-effect"
          onSubmit={handleLogin}
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-green-700">Welcome Back</h3>
            <p className="text-gray-600 text-sm font-medium">
              Sign in to manage your expenses
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <input
              className="rounded-lg px-4 py-2 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder="you@example.com"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <input
              className="rounded-lg px-4 py-2 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder="••••••••"
              type="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            className="bg-linear-to-br from-green-300 to-green-800 px-7 py-3 text-base text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
            type="submit"
          >
            Sign In
          </button>
          
          <div className="text-center text-gray-600 font-medium mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-700 font-semibold hover:underline">Sign up</Link>
          </div>
        </form>
      </main>

      {/* Animations for blobs and glass */}
      <style>{`
        .glass-effect { backdrop-filter: blur(14px) saturate(160%); background-blend-mode: soft-light; }
        @keyframes blob1 {0%,100%{transform:scale(1);} 33%{transform:scale(1.11) translateY(-10px);} 66%{transform:scale(0.96) translateX(6px);} }
        @keyframes blob2 {0%,100%{transform:scale(1);} 25%{transform:scale(1.04) translateY(-5px);} 55%{transform:scale(0.94) translateX(-9px);} }
        .animate-blob1 { animation: blob1 19s infinite cubic-bezier(.44,1.36,.45,.97);}
        .animate-blob2 { animation: blob2 17s infinite cubic-bezier(.23,.99,.52,.99);}
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default Login;
