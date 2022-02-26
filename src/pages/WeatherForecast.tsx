import { FC } from "react";
import { Link } from "react-router-dom";
import DayForecast from "components/DayForecast";
import { ForecastData, ListForecastDataItem } from "resources/interfaces";
import { dayForecastMapper } from "utils/mappers/weatherMapper";
import { FcHome } from "react-icons/fc";

const WeatherForecast: FC<ForecastData> = ({ city, list }): JSX.Element => {
    const { name, country } = city;

    return (
        <article className="bg-slate-50">
            <div className="px-4 py-5 sm:px-6">
                {name && country &&
                    <h2 className="text-black text-2xl font-bold text-center flex items-center content-center">
                        <FcHome />
                        <span className="ml-2">{name}, {country}</span>
                    </h2>
                }
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-6">
                {list.slice(0, 5).map((item: ListForecastDataItem) => {
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

