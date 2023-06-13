import React, {useState} from "react";
import DailyCard from "./components/DailyCard/DailyCard";
import Form from "./components/Form/Form";
import CurrentConditions from "./components/CurrentConditions/CurrentConditions";

const Forecast = () => {

    let [city, setCity] = useState('London,uk');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [forecastForFiveDays, setForecastForFiveDays] = useState([]);


    function getForecast(e, cityName, unitChoosen) {
        e.preventDefault();

        setCity(cityName);
        setUnit(unitChoosen);

        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setLoading(true);

        let url = new URL("https://api.openweathermap.org/data/2.5/forecast?");
        let params = {
            q: cityName,
            units: unitChoosen,
            appid: process.env.REACT_APP_API_KEY
        }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url.toString(), {
            "method": "GET"
        })
            .then(response => response.json())
            .then(data => {
                let dailyData = data.list.filter(reading => {
                    return reading.dt_txt.includes("18:00:00");
                });
                setForecastForFiveDays(dailyData);
                setLoading(false);

            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });

    }

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>

            <Form
                city={city}
                unit={unit}
                handleSubmit={getForecast}
            />

            {error && <small>Please enter a valid city</small>}

            {loading && <div>Loading...</div>}


            {forecastForFiveDays.length > 0 ?
                <div>
                    <span className="weather-now-city">
                        {city}
                        <br/>
                        {forecastForFiveDays[0].dt_txt}
                    </span>


                    <div className="weather-now">

                           <p className="weather-now-temp">
                                   <span>{forecastForFiveDays[0].main.temp} &deg;
                                       {unit === 'imperial' ? 'F' : 'C'}
                                       </span>
                               <br/>
                               {forecastForFiveDays[0].weather[0].main}
                           </p>

                        <CurrentConditions data={forecastForFiveDays[0]} />
                    </div>



                    <div className="weather-cards">

                        {forecastForFiveDays.map( (daily, i) => {
                            return <DailyCard
                                        key={i}
                                        error={error}
                                        loading={loading}
                                        data={daily}
                                        icon={daily.weather[0].icon} />
                        })}
                    </div>
                </div>

                : null }

        </div>
    )
}

export default Forecast;
