import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

/**
 * ThemeToggle — cycles through light → dark → system
 * Pass `variant="icon"` (default) or `variant="full"` for a labelled button.
 */
export function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, setTheme } = useTheme();

  const cycle = { light: 'dark', dark: 'system', system: 'light' };

  const icons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  };

  const labels = { light: 'Light', dark: 'Dark', system: 'System' };

  const handleToggle = () => setTheme(cycle[theme]);

  if (variant === 'full') {
    return (
      <button
        onClick={handleToggle}
        aria-label={`Switch theme (current: ${theme})`}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
          bg-muted hover:bg-accent text-foreground transition-all duration-200 ${className}`}
      >
        <span className="transition-transform duration-300 hover:rotate-12">
          {icons[theme]}
        </span>
        <span>{labels[theme]}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch theme (current: ${theme})`}
      className={`relative p-2 rounded-xl bg-muted hover:bg-accent text-foreground
        transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
    >
      <span className="block transition-transform duration-300 hover:rotate-12">
        {icons[theme]}
      </span>
    </button>
  );
}
