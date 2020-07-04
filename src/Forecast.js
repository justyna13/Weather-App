import React, {useState} from "react";
import Conditions from "./components/Conditions";

const Forecast = () => {

    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('London,uk');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);


    function getForecast(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
        setLoading(true);

        let url = new URL("https://community-open-weather-map.p.rapidapi.com/weather?");
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

                if(data.cod !== 200) {
                    throw new Error();
                }

                setResponseObj(data);
                setLoading(false);

            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>


            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={e => setCity(e.target.value)} />

                    <br/>

                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === 'imperial'}
                        value="imperial"
                        onChange={e => setUnit(e.target.value)} />
                    Fahrenheit
                </label>

                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === 'metric'}
                        value="metric"
                        onChange={e => setUnit(e.target.value)} />
                    Celcius
                </label>
                <br/>
                <button type="submit">Get Forecast</button>
            </form>

            <Conditions
                responseObj={responseObj}
                error={error}
                loading={loading} />
        </div>
    )
}

export default Forecast;
