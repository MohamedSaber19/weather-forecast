import { ListForecastDataItem } from "resources/interfaces";

export default function getWeatherByTime(key: string, array: ListForecastDataItem[]): ListForecastDataItem {
    return array[0];
}
