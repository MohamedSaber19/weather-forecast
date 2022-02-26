import { FC, useCallback, useEffect, useState } from 'react';
import useCurrentLocation from './utils/hooks/useCurrentLocation';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import WeatherForecast from './pages/WeatherForecast';
import WeatherDetails from './pages/WeatherDetails';
import { weatherMapper } from './utils/mappers/weatherMapper';
import { CityForecastData, ForecastData, ListForecastDataItem } from './resources/interfaces';
import NotFound from './pages/NotFound';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY as string;
const geolocationOptions: PositionOptions = {
  timeout: 1000 * 60 * 1,
  enableHighAccuracy: true
};
const initialState: ForecastData = {
  city: {} as CityForecastData,
  list: [] as ListForecastDataItem[]
}

const App: FC = (): JSX.Element => {
  const [data, setData] = useState<ForecastData>(initialState);
  const { location, error } = useCurrentLocation(geolocationOptions);

  /**
   * Fetch weather data from API
   * @returns {Promise} data in json format
   */
  const fetchWeatherData = useCallback(async () => {
    const { latitude, longitude } = location;
    if (latitude && longitude) { // to prevent calling API with undefined values
      const apiUrl = new URL(`${process.env.REACT_APP_WEATHER_API_BASE_URL}/forecast`);
      apiUrl.searchParams.append("lat", latitude.toString());
      apiUrl.searchParams.append("lon", longitude.toString());
      apiUrl.searchParams.append("appid", apiKey);
      apiUrl.searchParams.append("units", "metric");

      const response = await fetch(apiUrl.toString());
      const json = await response.json();
      setData(weatherMapper(json));
    }
  }, [location])

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  return (
    <main className="min-h-screen p-5 bg-slate-300">
      <section className="bg-white shadow overflow-hidden sm:rounded-lg">
        <header className="px-4 py-5 sm:px-6 bg-teal-100">
          <h1 className="text-3xl leading-6 font-medium text-gray-900">Weather Forecast</h1>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<WeatherForecast city={data.city} list={data.list} />} />
            <Route path="/:date" element={<WeatherDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <div className="border-t border-gray-200">
          {error && <span>{error}, fallback to cairo...</span>}
        </div>
      </section>
    </main>
  );
}

export default App;
