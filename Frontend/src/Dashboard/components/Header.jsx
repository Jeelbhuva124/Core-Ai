import { ThemeToggle } from '../../components/ThemeToggle';
import { Bell } from 'lucide-react';

export const AdminHeader = ({ title = 'Dashboard' }) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg bg-muted hover:bg-accent transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Shared Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};
