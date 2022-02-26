export interface ForecastData {
  city: CityForecastData;
  list: ListForecastDataItem[];
}

export interface DayForecastData {
  dt: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  icon: string;
  state: string;
  wind_speed: number;
  dt_txt: string;
  day_date: string;
  day_time: string;
  day_name: string;
}

export interface CityForecastData {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ListForecastDataItem {
  date: string;
  value: DayForecastData[];
}
