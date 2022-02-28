import { IDayForecastData } from "resources/interfaces";

/**
 * Get matched weather object with time string
 * if not exist get first element
 * @function getWeatherByTime
 * @param {String} time time string
 * @param {Array} array array of weather objects
 * @return {IDayForecastData} matched weather object
 */
export default function getWeatherByTime(
  time: string,
  array: IDayForecastData[]
): IDayForecastData {
  const matchedDay = array.find(
    (item: IDayForecastData) => item.day_time === time
  );
  return matchedDay || array[0];
}
