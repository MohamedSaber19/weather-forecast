import DayForecast from "components/shared/DayForecast";
import { MdNavigateNext } from "react-icons/md";
import { FcLandscape } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { IDayForecastData, IErrorMSG } from "resources/interfaces";
import { dayForecastMapper } from "utils/mappers/weatherMapper";
import noMatchImg from "assets/images/no-results-found.png";
import ErrorMessage from "components/shared/ErrorMessage";

type State = {
  data: any[]
}

const WeatherDetails: React.FC = (): JSX.Element => {
  const location = useLocation();
  const { data } = location?.state as State || [];
  const mappedData = data?.map((item: any) => dayForecastMapper(item)) || [];
  const { day_name = null, day_date = null } = mappedData[0] || {};

  /**
   * Render content method
   * @function
   */
  const renderData = () => {
    // If no data/wrong param render error message
    if (mappedData.length === 0) {
      const errObj: IErrorMSG = {
        imgURL: noMatchImg,
        message: "No matching results",
        linkURL: "/",
        linkText: "Go Home"
      };
      return (
        <ErrorMessage data={errObj} />
      )
    }
    // render content
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {mappedData?.map((item: IDayForecastData) => {
          return (
            <article key={item.dt_txt}>
              <DayForecast data={item} />
            </article>
          )
        })}
      </section>
    )
  }

  return (
    <article className="bg-slate-50">
      {day_name && day_date && <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
        <h2 className="text-gray-500 text-xl text-center flex items-center content-center">
          <FcLandscape size={30} />
          <span className="ml-4 text-sm md:text-base">{day_name}, {day_date}</span>
        </h2>
        <Link to="/" className="text-gray-500 hover:underline underline-offset-1 flex items-center text-sm md:text-base">
          <span className="hidden md:block">Home</span>
          <MdNavigateNext size={24} />
        </Link>
      </div>}
      {renderData()}
    </article >
  )
}

export default WeatherDetails;