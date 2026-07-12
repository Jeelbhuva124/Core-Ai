import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

export const UserOnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check local storage for user profile
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      try {
        const userObj = JSON.parse(storedUserStr);
        setUserData(userObj);

        // If the user object doesn't have firstName and lastName, open the modal
        if (!userObj.firstName || !userObj.lastName) {
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Failed to parse user from local storage:', err);
      }
    } else {
      // If there's no user object at all, we might create a generic one or wait for login.
      // But since this is in the dashboard, they should be logged in. We'll prompt them anyway.
      setUserData({});
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setIsLoading(true);

    // Simulate network delay for smooth UX
    setTimeout(() => {
      const freshStr = localStorage.getItem('user');
      const freshUser = freshStr ? JSON.parse(freshStr) : userData;
      
      const updatedUser = {
        ...(freshUser || {}),
        firstName: firstName.trim(),
        lastName: lastName.trim()
      };

      // Save back to local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setIsOpen(false);
      setIsLoading(false);

      // Reload to update sidebar and home page components with the new data
      window.location.reload();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-card border border-border shadow-2xl rounded-3xl p-8 overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
                <User className="w-7 h-7" strokeWidth={1.5} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Welcome!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Before you start using your workspace, please let us know your name so we can personalize your experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !firstName.trim() || !lastName.trim()}
                  className="w-full flex items-center justify-center py-4 px-4 mt-4 rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all font-bold tracking-widest uppercase text-sm shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Save Profile
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
