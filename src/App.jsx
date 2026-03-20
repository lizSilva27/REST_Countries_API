import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
import Home from './Home';
import Header from './components/Header';
import CountryDetail from './components/CountryDetail';
import './assets/sass/main.scss';

function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == 'light' ? 'dark' : 'light'));
  };
  return (
    <Router>
      <Header onToggleTheme={toggleTheme} currentTheme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </Router>
    );
  }

export default App