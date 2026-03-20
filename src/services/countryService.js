const BASE_URL = 'https://restcountries.com/v3.1';
import localData from '../assets/data/data.json';

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error('Error en la respuesta de la API');
    return await response.json();
  } catch (error) {
    console.warn("La API falló o no hay red. Cargando datos locales de respaldo...");
    return localData;
  }
};