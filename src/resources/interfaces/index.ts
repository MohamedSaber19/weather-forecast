export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IForecastData {
  city: ICityForecastData;
  list: IListForecastDataItem[];
}

export interface IDayForecastData {
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

export interface ICityForecastData {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IListForecastDataItem {
  date: string;
  value: IDayForecastData[];
}

export interface IErrorMSG {
  message: string;
  imgURL: string;
  linkURL: string;
  linkText: string;
}
