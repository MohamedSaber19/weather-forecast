import { FC } from "react";
import { DayForecastData } from "resources/interfaces";
import { getTime } from "services/dateService";

type Props = {
  data: DayForecastData
}

const DayForecast: FC<Props> = ({ data }): JSX.Element => {
  const { icon, state, day_name, temp, dt_txt } = data;
  const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="hover:bg-teal-50 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-x-4">
      <div className="shrink-0">
        <img className="h-18 w-18" src={imgURL} alt={state} />
      </div>
      <div>
        <div className="text-xl font-medium text-black">{day_name}</div>
        <p className="text-l font-medium text-black">{getTime(dt_txt)}</p>
        <p className="text-slate-500 flex items-center">{temp} &deg;C </p>
        <p className="text-slate-500">{state}</p>
      </div>
    </div>
  )
}

export default DayForecast;
