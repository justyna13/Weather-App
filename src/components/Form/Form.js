import React from "react";
import './styles.scss';
import PropTypes from 'prop-types';


class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            city: '',
            unit: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ city: this.props.city });
        this.setState({ unit: this.props.unit });
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(e, this.state.city, this.state.unit);
        this.setState({ newData: true });
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit} className="weather-form">
                    <input
                        type="text"
                        className="weather-input"
                        placeholder="Enter City"
                        maxLength="50"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange} />

                    <br/>

                    <label>
                        <input
                            type="radio"
                            name="unit"
                            className="weather-input"
                            checked={this.state.unit === 'imperial'}
                            value="imperial"
                            onChange={this.onChange} />
                        Fahrenheit
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="unit"
                            className="weather-input"
                            checked={this.state.unit === 'metric'}
                            value="metric"
                            onChange={this.onChange} />
                        Celcius
                    </label>
                    <br/>
                    <button type="submit">Get Forecast</button>
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    city: PropTypes.string,
    unit: PropTypes.string,
    handleSubmit: PropTypes.func,
}


export default Form;
