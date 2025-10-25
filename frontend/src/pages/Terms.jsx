import { Link } from 'react-router-dom';
import { Wallet, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const Terms = () => {
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
            <Link to="/privacy" className="text-gray-700 hover:text-green-600 font-semibold transition">Privacy</Link>
          </nav>
        </header>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-10 w-10 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-black text-green-700">Terms of Service</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 25, 2025
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Expense Tracker. By accessing or using our service, you agree to be bound by these Terms of Service. 
              Please read them carefully. If you do not agree with any part of these terms, you may not use our service.
            </p>
          </section>

          {/* Acceptance */}
          <section className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-700">
              By creating an account and using Expense Tracker, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                You must be at least 13 years old to use this service
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                You must provide accurate and complete information during registration
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                You are responsible for maintaining the security of your account
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                You must not share your account credentials with others
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                You are responsible for all activities under your account
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">When using Expense Tracker, you agree to:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Permitted Uses
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Track personal expenses</li>
                  <li>• Use features responsibly</li>
                  <li>• Provide accurate information</li>
                  <li>• Comply with all laws</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Prohibited Uses
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Violate any laws</li>
                  <li>• Abuse or exploit the service</li>
                  <li>• Share illegal content</li>
                  <li>• Attempt unauthorized access</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We strive to provide reliable service, but we cannot guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Uninterrupted or error-free service</li>
              <li>That the service will meet all your requirements</li>
              <li>That defects will be corrected immediately</li>
              <li>Compatibility with all devices or browsers</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We reserve the right to modify, suspend, or discontinue any part of the service with or without notice.
            </p>
          </section>

          {/* Data Ownership */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Ownership</h2>
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong className="text-green-700">Your Data Belongs to You</strong>
              </p>
              <p className="text-gray-700">
                You retain all rights to the data you enter into Expense Tracker. We do not claim ownership of your financial information. 
                You can export or delete your data at any time.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimer of Warranties</h2>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 
                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EXPENSE TRACKER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
              OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Request from law enforcement</li>
              <li>Extended period of inactivity</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You may also terminate your account at any time through your profile settings.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email 
              or through the service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
              conflict of law provisions.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Questions About These Terms?</h2>
            <p className="text-gray-700 mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Email:</p>
              <a href="#" className="text-green-600 hover:underline break-all">
                contact@expensetracker.com
              </a>
            </div>
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

export default Terms;
