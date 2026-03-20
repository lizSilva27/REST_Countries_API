import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getAllCountries } from "../services/countryService"

const CountryDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await getAllCountries();
        const foundCountry = data.find(c => (c.alpha3Code) === id);
        setCountry(foundCountry);
      } catch (error) {
        console.error("Error cargando el detalle: ", error);
      } finally {

        setLoading(false);
      }
    };
    fetchCountryData();
  }, [id]);

  if (loading) return <div className='loader'>Loading details...</div>;
  if (!country) return <div className='error'>Country not found...</div>;

  return (
    <main className="container">
      {/* Botón para retoceder */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Contenido de los detalles de cada tarjeta */}
      <section className="detailsCard">
        <div className="detailsCard__flag">
          <img src={country.flags.svg} alt={`Flag of ${country.name}`} />
        </div>
        <div className="detailsCard__description">
          <h2 className="detailsCard__nameCountry">{country.name}</h2>
          <div className="detailsCard__contentMore">
            <div className="detailsCard__contentMore--left">
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Native Name: </span>{country.nativeName}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Population: </span>{country.population.toLocaleString()}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Region: </span>{country.region}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Sub Region: </span>{country.subregion}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Capital: </span>{country.capital}</p>
            </div>
            <div className="detailsCard__contentMore--right">
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Top Level Domain: </span>{country.topLevelDomain?.[0]}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Currencias: </span>{country.currencies?.map(c => c.name).join(', ')}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Symbol: </span>{country.currencies?.map(c => c.symbol).join(', ')}</p>
              <p className="detailsCard__contentMore--paragraph"><span className="txtBold">Languages: </span>{country.languages?.map(l => l.name).join(', ')}</p>
            </div>
          </div>
          <div className="detailsCard__borderCountries">
            <p className="detailsCard__borderCountries--title txtBold">Border Countries:</p>
            <div className="detailsCard__borderCountries--container">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode) => (
                  <Link key={borderCode} to={`/country/${borderCode}`} className="detailsCard__borderCountries--1">
                    {borderCode}
                  </Link>
                ))
              ): (
                <span>No border countries</span>
              )}
              {/* <p className="detailsCard__borderCountries--1">France</p>
              <p className="detailsCard__borderCountries--2">Germany</p>
              <p className="detailsCard__borderCountries--3">Netherlands</p> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CountryDetail