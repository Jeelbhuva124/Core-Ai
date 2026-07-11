import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle — cycles through light → dark
 * Pass `variant="icon"` (default) or `variant="full"` for a labelled button.
 */
export function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, setTheme } = useTheme();

  // Handle cases where 'system' might still be stored, mapping it to 'dark'
  const currentTheme = theme === 'system' ? 'dark' : (theme || 'dark');
  const cycle = { light: 'dark', dark: 'light' };

  const icons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
  };

  const labels = { light: 'Light', dark: 'Dark' };

  // No background, just icon matching the header links
  const buttonColor = 'bg-transparent text-muted-foreground hover:text-foreground';

  const handleToggle = () => setTheme(cycle[currentTheme]);

  if (variant === 'full') {
    return (
      <button
        onClick={handleToggle}
        aria-label={`Switch theme (current: ${currentTheme})`}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${buttonColor} ${className}`}
      >
        <span className="transition-transform duration-300 hover:rotate-12">
          {icons[currentTheme]}
        </span>
        <span>{labels[currentTheme]}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch theme (current: ${currentTheme})`}
      className={`relative p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${buttonColor} ${className}`}
    >
      <span className="block transition-transform duration-300 hover:rotate-12">
        {icons[currentTheme]}
      </span>
    </button>
  );
}
