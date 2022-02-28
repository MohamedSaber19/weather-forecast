import loader from "assets/images/loader.svg";
import DayForecast from "components/shared/DayForecast";
import { useCallback, useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import { API_REFRESH_MS, DAY_PM_TIME, DEFAULT_CITY, GPS_ACESS_ERR } from "resources/constants";
import { ICityForecastData, IForecastData, IListForecastDataItem } from "resources/interfaces";
import getWeatherByTime from "services/getWeatherByTime";
import useCurrentLocation from "utils/hooks/useCurrentLocation";
import { dayForecastMapper, weatherMapper } from "utils/mappers/weatherMapper";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY as string;

const geolocationOptions: PositionOptions = {
    timeout: 1000 * 60 * 1,
    enableHighAccuracy: true
};

const initialState: IForecastData = {
    city: {} as ICityForecastData,
    list: [] as IListForecastDataItem[]
}

const WeatherForecast: React.FC = (): JSX.Element => {
    const [data, setData] = useState<IForecastData>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
            // adding 1 sec timeout here just to wait for loader animation to finish :)
            setTimeout(() => { setIsLoading(false) }, 1000)
        }
    }, [location])

    /**
     * Render pre-loader while fetching weather data
     * @returns {JSX.Element}
     */
    const renderLoader = (): JSX.Element=> {
        return (
            <div className="p-8 flex items-center justify-center flex-col">
                <img className="w-24 h-auto" alt="weather is loading" src={loader} />
                <p className="text-gray-500">Loading ...</p>
            </div>
        )
    }

    /**
     * Render GPS access error message
     * @returns {JSX.Element}
     */
    const renderErrorMsg = (): JSX.Element => {
        return (<p className="text-gray-400">{GPS_ACESS_ERR} <b>{DEFAULT_CITY}</b></p>);
    }

    // Fetching data
    useEffect(() => {
        fetchWeatherData()
        // Refreshing data after specific time
        const interval = setInterval(() => {
            fetchWeatherData();
        }, API_REFRESH_MS);
        return () => {
            // cleaning function to clear interval
            clearInterval(interval)
        }
    }, [fetchWeatherData])

    // render pre-loader
    if (isLoading) {
        return renderLoader();
    }

    // render content
    return (
        <article className="bg-slate-50">
            <div className="px-4 py-5 sm:px-6">
                {data.city.name && data.city.country &&
                    <h2 className="text-black text-2xl font-bold text-center flex items-center content-center">
                        <FcHome />
                        <span className="ml-2">{data.city.name}, {data.city.country}</span>
                    </h2>}
                {error && renderErrorMsg()}
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 p-3 md:p-6">
                {data.list.slice(0, 5).map((item: any) => {
                    const mappedDayForecast = dayForecastMapper(getWeatherByTime(DAY_PM_TIME, item.value));
                    return (
                        <article key={item.date}>
                            <Link
                                to={item.date}
                                state={{ data: item.value }}
                            >
                                <DayForecast data={mappedDayForecast} />
                            </Link>
                        </article>
                    )
                })}
            </section>
        </article>
    )
}

export default WeatherForecast;

