import { useState, useEffect } from 'react';
import { getAllCountries } from './services/countryService';
import Controls from './components/Controls';
import CountryCard from './components/CountryCard';

const Home = () => {
  
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error("Error al obtener los países:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Función para buscar por nombre
  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = countries.filter(country => {
      const name = country.name.toLowerCase();
      return name.includes(term);
    });
    setFilteredCountries(filtered);
  };

  // Función para filtrar por continente
  const handleRegionFilter = (region) => {
    if (!region) {
      setFilteredCountries(countries);
      return;
    }
    const filtered = countries.filter(country => country.region === region);
    setFilteredCountries(filtered);
  };

  return (
    <main className="container">
      <Controls onSearch={handleSearch} onRegionChange={handleRegionFilter} />
        {loading ? (
          <div className='loader'>Loading countries...</div>
        ): (
          <section className="countriesGrid">
            {filteredCountries.map((country) => (
              <CountryCard
                id={country.alpha3Code}
                key={country.alpha3Code}
                flag={country.flags.svg}
                name={country.name}
                population={country.population.toLocaleString()}
                region={country.region}
                capital={country.capital}
              />
            ))}
          </section>
        )}
    </main>
  );
};

export default Home