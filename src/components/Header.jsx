import { Moon, Sun } from 'lucide-react';
import { Menu, Search, User } from "lucide-react";

const Header = ({ onToggleTheme, currentTheme }) => {
  return (
    <header className="header">
      <div className="header__container">
        <a href='/' className="header__title">Where in the world?</a>
        <button className="header__theme-setter"  onClick={onToggleTheme} aria-label="Toggle dark mode">
          {currentTheme === 'light' ? <Moon size={20} fill={currentTheme === 'dark' ? 'currentColor': 'none'} /> : <Sun size={20} />}
          <span>{currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;