import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AiSidebar } from './AiSidebar';
import {
  Menu, Sun, Moon, Settings, LogOut, Bell, Palette, Puzzle,
  AudioLines, CreditCard, Database, HardDrive, Shield, Key,
  Users, UserCheck, User, Keyboard
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { UserOnboardingModal } from './UserOnboardingModal';
import { motion, AnimatePresence } from 'framer-motion';

const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: Settings, action: 'navigate' },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'personalization', label: 'Personalization', icon: Palette },
  { id: 'plugins', label: 'Plugins', icon: Puzzle },
  { id: 'voice', label: 'Voice', icon: AudioLines },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'data_controls', label: 'Data controls', icon: Database },
  { id: 'storage', label: 'Storage', icon: HardDrive },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'security', label: 'Security and login', icon: Key },
  { id: 'parental', label: 'Parental controls', icon: Users },
  { id: 'trusted', label: 'Trusted contact', icon: UserCheck },
  { id: 'account', label: 'Account', icon: User, action: 'navigate' },
  { id: 'keyboard', label: 'Keyboard', icon: Keyboard },
];

export const AiLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  // Settings Dropdown State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const effectiveTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  const toggleTheme = (e) => {
    e.stopPropagation();
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-screen overflow-hidden text-foreground relative" style={{ backgroundColor: effectiveTheme === 'dark' ? '#050505' : '#ffffff' }}>

      {/* Atmospheric glow effects spanning the entire app */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: effectiveTheme === 'dark'
            ? `
              radial-gradient(ellipse 700px 600px at 35% 20%, rgba(140, 50, 220, 0.12) 0%, transparent 70%),
              radial-gradient(ellipse 700px 600px at 85% 80%, rgba(30, 80, 220, 0.12) 0%, transparent 70%),
              radial-gradient(ellipse 500px 400px at 85% 10%, rgba(120, 40, 200, 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 400px 300px at 35% 90%, rgba(100, 30, 180, 0.05) 0%, transparent 60%)
            `
            : `
              radial-gradient(ellipse 700px 600px at 35% 20%, rgba(140, 50, 220, 0.40) 0%, transparent 70%),
              radial-gradient(ellipse 700px 600px at 85% 80%, rgba(30, 80, 220, 0.40) 0%, transparent 70%),
              radial-gradient(ellipse 500px 400px at 85% 10%, rgba(120, 40, 200, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 400px 300px at 35% 90%, rgba(100, 30, 180, 0.25) 0%, transparent 60%)
            `
        }}
      />

      {/* Main Layout Content */}
      <div className="relative z-10 flex h-full w-full">
        <AiSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          desktopOpen={desktopOpen}
          onToggleDesktop={() => setDesktopOpen(!desktopOpen)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

          {/* Header Bar */}
          <header className={`flex items-center justify-between p-4 z-50 sticky top-0 transition-all ${!desktopOpen || mobileOpen ? 'border-b border-border bg-background/80 backdrop-blur-sm' : 'bg-transparent'
            }`}>

            {/* Left: Hamburger & Logo (Visible on mobile, or on desktop when sidebar is closed) */}
            <div className={`flex items-center ${!desktopOpen ? 'flex' : 'lg:hidden'}`}>
              <button
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setDesktopOpen(true);
                  } else {
                    setMobileOpen(true);
                  }
                }}
                className="p-2 -ml-2 rounded-xl text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
              <span className="ml-2 font-semibold text-[17px] text-foreground">Core AI</span>
            </div>

            {/* Right: Settings Dropdown */}
            <div className="ml-auto relative" ref={settingsMenuRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                aria-label="Settings"
                className={`relative p-2 rounded-xl transition-all duration-300 active:scale-90 flex items-center justify-center ${isSettingsOpen
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'bg-sidebar/50 hover:bg-sidebar backdrop-blur-md border border-border text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Settings className={`w-5 h-5 transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : 'rotate-0'}`} strokeWidth={1.8} />
              </button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 w-64 bg-card border border-border shadow-2xl rounded-xl overflow-hidden z-50 flex flex-col max-h-[80vh]"
                  >

                    {/* Settings List */}
                    <div className="overflow-y-auto hide-scrollbar flex-1 py-1">
                      {SETTINGS_TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              if (tab.action === 'navigate') {
                                navigate('/dashboard/profile');
                                setIsSettingsOpen(false);
                              }
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-muted/80 text-foreground transition-colors"
                          >
                            <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-3 border-t border-border/50 bg-card/95 backdrop-blur-sm sticky bottom-0">
                      <p className="text-xs font-semibold text-muted-foreground px-1 mb-2 uppercase tracking-wider">Appearance</p>

                      {/* Theme Toggle Pill */}
                      <div className="relative flex items-center bg-muted/60 rounded-full p-1 border border-border mb-3">
                        <motion.div
                          className="absolute inset-y-1 bg-card rounded-full shadow-sm border border-border"
                          initial={false}
                          animate={{
                            left: effectiveTheme === 'light' ? '0.25rem' : '50%',
                            width: 'calc(50% - 0.25rem)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                        <button
                          onClick={toggleTheme}
                          className={`relative z-10 flex flex-1 items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${effectiveTheme === 'light' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          <Sun className="w-3.5 h-3.5" strokeWidth={2} />
                          Light
                        </button>
                        <button
                          onClick={toggleTheme}
                          className={`relative z-10 flex flex-1 items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${effectiveTheme === 'dark' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          <Moon className="w-3.5 h-3.5" strokeWidth={2} />
                          Dark
                        </button>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-destructive/10 text-destructive transition-colors rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto relative h-full z-[1]">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Onboarding Modal Overlay */}
      <UserOnboardingModal />
    </div>
  );
};
