import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, LogOut, User, BarChart3 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const NAV_LINKS = [
  { name: "Home", to: "/dashboard" },
  { name: "Expenses", to: "/expenses" },
  { name: "Insights", to: "/insights" },
  { name: "Tips", to: "/tips" },
  { name: "Add Expense", to: "/add-expense" }
];

const Navbar = ({ onAddExpense }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof logout === "function") logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#f4f7f4]/80 border-b border-slate-200 shadow-sm backdrop-blur-xl z-30 fixed top-0 left-0">
      <div className="mx-8 flex items-center justify-between px-4 py-2">
        {/* Left: Logo and Name */}
        <header className="relative z-10 flex justify-between items-center px-6 py-4">
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
        {/* Center: Menu Tabs */}
        <div className="flex gap-2">
          {NAV_LINKS.map(link =>
            link.name === "Add Expense" ? (
              <button
                key={link.to}
                className="px-4 py-1 text-base rounded-md font-medium bg-[#ecebe6] hover:bg-green-100 text-gray-700 transition"
                // Fix: must call onAddExpense!
                onClick={onAddExpense}
                type="button"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1 text-base rounded-md font-medium
                  ${location.pathname === link.to
                    ? "bg-green-600 text-white shadow"
                    : "bg-[#ecebe6] hover:bg-green-100 text-gray-700"}
                  transition`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
        {/* Right: User & Logout */}
        <div className="flex items-center gap-4 ml-4">
          {user && (
            <>
            <div className="flex justify-center items-center">
              <Link to="/profile" className="rounded-full hover:bg-green-100 transition p-2" title="Profile" >
                <User className="w-5 h-5 text-green-700" />
              </Link>
                <span className="font-semibold text-gray-700">{user.name}</span>
            </div>
            </>
          )}
          <button onClick={handleLogout} className="bg-linear-to-tr from-green-600 to-green-800 text-white rounded-lg px-4 py-2 font-bold hover:scale-105 transition flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
