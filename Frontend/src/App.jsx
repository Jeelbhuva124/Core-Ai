import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ─── Context Providers ────────────────────────────────────
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// ─── Shared Components ────────────────────────────────────
import { Toaster } from './components/Toaster';

// ─── Root Pages (src/page) ────────────────────────────────
import { Home } from './page/Home';

// ─── Auth Pages ───────────────────────────────────────────
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

// ─── UserPanel Pages ──────────────────────────────────────
import { UserLayout } from './UserPanel/components/UserLayout';
import { Shop } from './UserPanel/pages/Shop';
import { About } from './UserPanel/pages/About';
import { Contact } from './UserPanel/pages/Contact';

// ─── AdminPanel Pages ─────────────────────────────────────
import { AdminLayout } from './AdminPanel/components/AdminLayout';
import { Dashboard }  from './AdminPanel/pages/Dashboard';
import { Products }   from './AdminPanel/pages/Products';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="awd-ui-theme">
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              {/* ── Auth Pages (Standalone) ── */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* ── User Panel (with Header & Footer) ─── */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* ── Admin Panel (with Sidebar & Header) ── */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Routes>
          </div>
        </Router>

        {/* Global Toaster */}
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
