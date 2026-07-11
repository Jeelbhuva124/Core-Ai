import React from 'react';
import { Link } from 'react-router-dom';


export const UserFooter = () => {
  return (
    <footer className="relative bg-background pt-12 overflow-hidden border-t border-border/40 mt-auto flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo and Info */}
          <div className="col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain drop-shadow-sm dark:brightness-0 dark:invert" 
              />
              <span>Core AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Institutional-grade trade copying for Indian derivatives. Mirror master trades across every connected broker in under 15ms.
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              © 2026 CORE AI · SEBI compliant · Mumbai
            </p>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:pl-12 lg:pl-24">
            
            {/* PRODUCT */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold text-foreground tracking-widest uppercase mb-1">Product</h4>
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link to="/demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Live demo</Link>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold text-foreground tracking-widest uppercase mb-1">Company</h4>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign up</Link>
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold text-foreground tracking-widest uppercase mb-1">Resources</h4>
              <Link to="/brokers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Brokers</Link>
              <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
              <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
            </div>
            
          </div>
        </div>
      </div>

      {/* Watermark Text */}
      <div className="w-full flex items-end justify-center pointer-events-none select-none -mt-4 md:-mt-12 lg:-mt-16 overflow-hidden relative z-0">
        <h1 className="text-[20vw] md:text-[24vw] lg:text-[26vw] font-bold tracking-tighter leading-none text-center whitespace-nowrap bg-gradient-to-b from-foreground/10 to-background bg-clip-text text-transparent translate-y-[15%]">
          CORE AI
        </h1>
      </div>
    </footer>
  );
};
