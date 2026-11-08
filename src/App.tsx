import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Science } from './pages/Science';
import { Innovations } from './pages/Innovations';
import { Entrepreneurship } from './pages/Entrepreneurship';
import { Publications } from './pages/Publications';
import { Founder } from './pages/Founder';
import { Contact } from './pages/Contact';

// Auth & Dashboard Pages
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { Dashboard } from './pages/Auth/Dashboard';
import { AdminDashboard } from './pages/Admin/Dashboard';

// Legal Pages
import { PrivacyPolicy } from './pages/Legal/PrivacyPolicy';
import { Terms } from './pages/Legal/Terms';
import { NotFound } from './pages/NotFound';

// Scroll To Top on Route Change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/science" element={<Science />} />
                <Route path="/innovations" element={<Innovations />} />
                <Route path="/entrepreneurship" element={<Entrepreneurship />} />
                <Route path="/publications" element={<Publications />} />
                
                {/* Dedicated Founder URLs */}
                <Route path="/founder" element={<Founder />} />
                <Route path="/founder/nikhilendra-srinivas" element={<Founder />} />
                <Route path="/founder/*" element={<Founder />} />
                <Route path="/contact" element={<Contact />} />

                {/* Account & Member System */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Secure Administrator Dashboard */}
                <Route path="/portal" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Legal & Trust */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<Terms />} />

                {/* Fallback 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
