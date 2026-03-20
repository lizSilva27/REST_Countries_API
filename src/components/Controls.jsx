import { Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Controls = ({ onSearch, onRegionChange }) => {

  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handlerClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    }
  }, []);

  return (
    <section className="controls">
      <div className="search">
        <Search className="search__icon" size={18} />
        <input type="text" placeholder="Search or a country..." className="search__input" onChange={(e) => onSearch(e.target.value)} />
      </div>

      {/* Contenedor del Filtro (Dropdown Custom) */}
      <div className="filter">
        <button className="filter__button" onClick={() => setOpen(!open)}>
          Filter by Region
          <ChevronDown className={open ? "icon open" : "icon"} size={18} />
        </button>
        {open && (
          <ul className="filter__menu">
            {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
              <li key={region} onClick={() => {
                onRegionChange(region); 
                setOpen(false);
                }}
              >
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Controls