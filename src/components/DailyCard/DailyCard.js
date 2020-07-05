import React from "react";
import styles from './styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faWind, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons'


function setIcon(desc) {
    switch (desc) {
        case '01d':
            return <FontAwesomeIcon icon={faSun} size="2x" />;
        case '02d':
            return <FontAwesomeIcon icon={faBolt} size="2x" />;
        case '03d':
            return <FontAwesomeIcon icon={faWind} size="2x" />;
        case '04d':
            return <FontAwesomeIcon icon={faSun} size="2x" />;
        case '05d':
            return <FontAwesomeIcon icon={faBolt} size="2x" />;
        case '06d':
            return <FontAwesomeIcon icon={faWind} size="2x" />;
        case '07d':
            return <FontAwesomeIcon icon={faSun} size="2x" />;
        case '08d':
            return <FontAwesomeIcon icon={faBolt} size="2x" />;
        case '09d':
            return <FontAwesomeIcon icon={faWind} size="2x" />;
        case '10d':
            return <FontAwesomeIcon icon={faCloudRain} size="2x" />;
        default:
            return null;
    }
}


const DailyCard = (props) => {
    let [day, time] = props.data.dt_txt.split(" ");

    console.log(props.data.weather[0]);

    return (
        <div className="weather-card">

            {props.data ?
                <div>
                    <h6>{day}</h6>
                    <h6>{time}</h6>

                    {setIcon(props.icon)}

                    <p>{props.data.main.temp} &deg;</p>
                </div>
                : null
            }
        </div>
    )
}

export default DailyCard;
