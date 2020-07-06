import React from "react";
import './styles.css'


const CurrentConditions = (props) => {

    return (

        <div className="today-weather-card">

            <div className="first-row">

                <span>
                    <span className="weather-data">{props.data.main.temp_min}</span>
                    <br/>
                    Temp min
                </span>

                <span>
                    <span className="weather-data">{props.data.main.feels_like}</span>
                    <br/>
                    Feels like
                </span>

                <span>
                    <span className="weather-data">{props.data.main.humidity}</span>
                    <br/>
                    Humidity
                </span>

            </div>

            <div className="second-row">

                <span>
                    <span className="weather-data">{props.data.main.temp_max}</span>
                    <br/>
                    Temp max
                </span>

                <span>
                    <span className="weather-data">{props.data.wind.speed}</span>
                    <br/>
                    Wind
                </span>

                 <span>
                    <span className="weather-data">{props.data.main.pressure}</span>
                    <br/>
                    Pressure
                </span>

            </div>

        </div>
    )
}

export default CurrentConditions;
