import { DayForecastData, ForecastData } from "resources/interfaces";
import { getDayName } from "services/dateService";
import groupByKey from "services/groupByKey";
/**
 * Map weather data object
 * @returns {ForecastData} Mapped weather forecast object
 */
export function weatherMapper(data: ForecastData): ForecastData {
  const grouped = groupByKey(data.list, "day_date");
  return { city: data.city, list: grouped };
}

/**
 * Map day data object
 * @returns {DayForecastData} Mapped day forecast object
 */
export function dayForecastMapper(data: any): DayForecastData {
  return {
    dt: data.dt,
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
    state: data.weather[0].description,
    wind_speed: data.wind.speed,
    dt_txt: data.dt_txt,
    day_date: data.day_date,
    day_time: data.day_time,
    day_name: getDayName(data.day_date),
  };
}
