import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NotFound from 'pages/NotFound';
import WeatherDetails from 'pages/WeatherDetails';
import WeatherForecast from 'pages/WeatherForecast';


const App: React.FC = (): JSX.Element => {

  return (
    <main className="min-h-screen p-5 bg-slate-300">
      <section className="bg-white shadow overflow-hidden sm:rounded-lg">
        <header className="px-4 py-5 sm:px-6 bg-teal-100">
          <h1 className="text-3xl leading-6 font-medium text-gray-900">Weather Forecast</h1>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<WeatherForecast />} />
            <Route path="/:date" element={<WeatherDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </section>
    </main>
  );
}

export default App;
