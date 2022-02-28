import { IDayForecastData } from "resources/interfaces";
import { getTime } from "services/dateService";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

type Props = {
  data: IDayForecastData
}

const DayForecast: React.FC<Props> = ({ data }): JSX.Element => {
  const {
    icon,
    state,
    day_name,
    temp,
    dt_txt,
    humidity,
    wind_speed,
    temp_min,
    temp_max,
    feels_like } = data;
  const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="hover:bg-teal-50 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col">
      <section className="flex items-center justify-between pb-2">
        <img src={imgURL} alt={state} />
        <div>
          <h2 className="text-l font-medium text-black">{day_name}</h2>
          <h3 className="text-2xl text-teal-400 font-medium">{temp} &deg;C </h3>
          <p className="text-xl font-medium text-gray-400">{getTime(dt_txt)}</p>
        </div>
      </section>
      <section className="pt-2 border-t-2 border-slate-100">
        <p className="text-black font-medium capitalize">{state}</p>
        <p className="text-teal-600 flex items-center">Feels like {feels_like} &deg;C </p>
        <div className="flex justify-between">
          <p className="text-slate-500">Min: {temp_min} &deg;C</p>
          <p className="text-slate-500">Max: {temp_max} &deg;C</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="flex items-center text-slate-500"><WiStrongWind size={20} /> {wind_speed}</p>
          <p className="flex items-center text-slate-500"><WiHumidity size={20} />{humidity}%</p>
        </div>
      </section>
    </div>
  )
}

export default DayForecast;
