import { IListForecastDataItem } from "resources/interfaces";

/**
 * generate new shape for the array of retrieved data from api
 * @function groupByKey 
 * @param {Array} array raw weather data list
 * @param {String} key key to map data with
 * @returns {IListForecastDataItem} new formatted array
 */
export default function groupByKey(array: any[], key: string) {
  let forecastData = [] as IListForecastDataItem[];
  // adding 2 new properties [day_date & day_time]
  const mappedArray = array.map((item: any) => ({
    ...item,
    day_date: item.dt_txt.split(" ")[0],
    day_time: item.dt_txt.split(" ")[1],
  }));

  // generating new array of objects {date: key, value: array_of_items}
  mappedArray.forEach((item: any) => {
    const itemIndex = forecastData.findIndex(
      (i: typeof item) => i.date === item[key]
    );
    if (itemIndex !== -1) {
      // exist
      forecastData[itemIndex].value.push(item);
    } else {
      forecastData.push({ date: item[key], value: [item] });
    }
  });

  return forecastData;
}
