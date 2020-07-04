import React, {useState} from "react";
import Conditions from "./components/Conditions";

const Forecast = () => {

    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('London,uk');
    let [unit, setUnit] = useState('imperial');


    function getForecast(e) {
        e.preventDefault();

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
                "x-rapidapi-key": "09e5ce21c0mshe37c1effd91d653p198ee9jsn68dd02e129fa"
            }
        })
            .then(response => response.json())
            .then(data => {
                setResponseObj(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
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

            <Conditions responseObj={responseObj} />
        </div>
    )
}

export default Forecast;
