import { FC } from "react";
import { useLocation } from "react-router-dom";
import DayForecast from "components/DayForecast";
import { DayForecastData } from "resources/interfaces";
import { dayForecastMapper } from "utils/mappers/weatherMapper";
import { FcLandscape } from "react-icons/fc";

type State = {
  data: any[]
}

const WeatherDetails: FC = (): JSX.Element => {
  let location = useLocation();
  const { data } = location.state as State || [];
  // set weather data of the day in localStorage [if not exist before]
  // to keep routing data saved to handle all cases [reloading, navigation using URL directly, ...etc]
  // if (mappedData.length > 0) localStorage.setItem('weather', JSON.stringify(mappedData));
  // const cachedData = JSON.parse(localStorage.getItem('weather') || "[]");
  const mappedData = data?.map((item: any) => dayForecastMapper(item)) || [];

  const { day_name, day_date } = mappedData[0];
  return (
    <article>
      <div className="px-4 py-5 sm:px-6">
        {day_name && day_date &&
          <h2 className="text-gray-500 text-xl text-center flex items-center content-center">
            <FcLandscape size={30} />
            <span className="ml-4">{day_name}, {day_date}</span>
          </h2>
        }
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {mappedData.map((item: DayForecastData) => {
          return (
            <article key={item.dt_txt}>
              <DayForecast data={item} />
            </article>
          )
        })}
      </section>
    </article>
  )
}

export default WeatherDetails;