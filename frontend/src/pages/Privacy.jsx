import { Link } from 'react-router-dom';
import { Wallet, Shield, Lock, Database, Eye, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50">
      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />

      <div className='mx-auto w-full max-w-7xl px-6'>
        <header className="relative z-10 flex justify-between items-center py-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-green-200/60 shadow-lg">
              <Wallet className="h-7 w-7 text-green-600" />
            </div>
            <span>
              <strong className="text-3xl font-black tracking-tight text-blue-950">Expense Tracker</strong>
              <div className="text-sm font-medium text-slate-700">Seamless finance tracking</div>
            </span>
          </Link>
          <nav className="flex gap-5 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-semibold transition">Home</Link>
            <Link to="/terms" className="text-gray-700 hover:text-green-600 font-semibold transition">Terms</Link>
          </nav>
        </header>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-black text-green-700">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 25, 2025
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Expense Tracker. We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our expense tracking application.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700">
                  When you create an account, we collect:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Password (encrypted and securely stored)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Financial Data</h3>
                <p className="text-gray-700">
                  We collect the expense information you provide:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Expense amounts</li>
                  <li>Categories</li>
                  <li>Descriptions</li>
                  <li>Dates and timestamps</li>
                  <li>Budget information</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-700">
                  We automatically collect:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address (anonymized)</li>
                  <li>Usage patterns and preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To provide and maintain our expense tracking service
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To send you notifications about your account
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To provide customer support
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To improve and personalize your experience
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To analyze usage patterns and improve our service
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                To detect and prevent fraud or abuse
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🔐 Encryption</p>
                <p className="text-sm text-gray-700">All data transmitted is encrypted using SSL/TLS</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🔒 Secure Storage</p>
                <p className="text-sm text-gray-700">Passwords are hashed using bcrypt</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">🛡️ Access Control</p>
                <p className="text-sm text-gray-700">Strict authentication and authorization</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-1">📊 Monitoring</p>
                <p className="text-sm text-gray-700">Regular security audits and monitoring</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              We may use third-party services for:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              <li>Hosting and infrastructure (Render, Vercel)</li>
              <li>Database services (MongoDB)</li>
              <li>Analytics (anonymized)</li>
            </ul>
            <p className="text-gray-700 mt-3">
              These services have their own privacy policies and we ensure they meet our security standards.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Email:</p>
              <a href="#" className="text-green-600 hover:underline break-all">
                contact@expensetracker.com
              </a>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
        </div>
      </main>

      {/* Animations */}
      <style>{`
        @keyframes blob1 {0%,100%{transform:scale(1);} 33%{transform:scale(1.11) translateY(-10px);} 66%{transform:scale(0.96) translateX(6px);} }
        @keyframes blob2 {0%,100%{transform:scale(1);} 25%{transform:scale(1.05) translateY(-5px);} 55%{transform:scale(0.94) translateX(-13px);} }
        .animate-blob1 { animation: blob1 21s infinite cubic-bezier(.44,1.36,.45,.97);}
        .animate-blob2 { animation: blob2 19s infinite cubic-bezier(.23,.99,.52,.99);}
      `}</style>
    </div>
  );
};

export default Privacy;
