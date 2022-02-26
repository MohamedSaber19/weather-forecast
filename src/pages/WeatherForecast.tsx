import loader from "assets/images/loader.svg";
import DayForecast from "components/DayForecast";
import { FC, useCallback, useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import { DEFAULT_CITY, GPS_ACESS_ERR } from "resources/constants";
import { CityForecastData, ForecastData, ListForecastDataItem } from "resources/interfaces";
import useCurrentLocation from "utils/hooks/useCurrentLocation";
import { dayForecastMapper, weatherMapper } from "utils/mappers/weatherMapper";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY as string;
const geolocationOptions: PositionOptions = {
    timeout: 1000 * 60 * 1,
    enableHighAccuracy: true
};
const initialState: ForecastData = {
    city: {} as CityForecastData,
    list: [] as ListForecastDataItem[]
}
const WeatherForecast: FC = (): JSX.Element => {
    const [data, setData] = useState<ForecastData>(initialState);
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
            setTimeout(() => { setIsLoading(false) }, 1000) //adding timeout here just to wait for loader animation to finish :)
        }
    }, [location])

    /**
     * Render pre-loader while fetching weather data
     * @returns {JSX.Element}
     */
    const renderLoader = () => {
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
    const renderErrorMsg = () => {
        return (<p className="text-gray-400">{GPS_ACESS_ERR} <b>{DEFAULT_CITY}</b></p>);
    }

    useEffect(() => {
        fetchWeatherData()
    }, [fetchWeatherData])


    if (isLoading) {
        return renderLoader();
    }
    return (
        <article className="bg-slate-50">
            <div className="px-4 py-5 sm:px-6">
                {data.city.name && data.city.country &&
                    <h2 className="text-black text-2xl font-bold text-center flex items-center content-center">
                        <FcHome />
                        <span className="ml-2">{data.city.name}, {data.city.country}</span>
                    </h2>
                }
                {error && renderErrorMsg()}
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-6">
                {data.list.slice(0, 5).map((item: ListForecastDataItem) => {
                    const mapped = dayForecastMapper(item.value[0]);
                    // REVISIT: to get unified hour for all days not just getting first element
                    return (
                        <article key={item.date}>
                            <Link
                                to={item.date}
                                state={{ data: item.value }}
                            >
                                <DayForecast data={mapped} />
                            </Link>
                        </article>
                    )
                })}
            </section>
        </article>
    )
}

export default WeatherForecast;

