import { Link } from 'react-router-dom';

const CountryCard = ({ flag, name, population, region, capital, id }) => {
  return (
    <Link to={`/country/${id}`} className='card-link'>
      <article className='countryCard'>
        <div className='countryCard__flag'>
          <img src={flag} alt={`Flag of ${name}`} />
        </div>
        <div className='countryCard__content'>
          <h2 className='countryCard__content__title'>{name}</h2>
            <ul className='countryCard__content__details'>
              <li><span className='txtBold'>Population: </span>{population}</li>
              <li><span className='txtBold'>Region: </span>{region}</li>
              <li><span className='txtBold'>Capital: </span>{capital}</li>
            </ul>
        </div>
      </article>
    </Link>
  )
}

export default CountryCard