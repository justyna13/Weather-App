import React, {useState} from "react";
import DailyCard from "./components/DailyCard/DailyCard";
import Form from "./components/Form/Form";

const Forecast = () => {

    let [responseObj, setResponseObj] = useState({});
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
        setResponseObj({});
        setLoading(true);

        let url = new URL("https://community-open-weather-map.p.rapidapi.com/forecast?");
        let params = {
            q: city,
            units: unit
        }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));



        fetch(url.toString(), {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                let dailyData = data.list.filter(reading => {
                    return reading.dt_txt.includes("18:00:00");
                });


                setForecastForFiveDays(dailyData);
                setResponseObj(data);
                setLoading(false);

            })
            .catch(err => {
                setError(true);
                setLoading(false);
                // console.log(err.message);
            });


        console.log(forecastForFiveDays);
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
                    <h4>Forecast</h4>

                    <div className="weather-cards">

                        {forecastForFiveDays.map( (daily, index) => {
                            return <DailyCard
                                        key={index}
                                        error={error}
                                        loading={loading}
                                        responseObj={responseObj}
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
