const Weather = ({capital, weatherData}) => {
    if (weatherData) {
        return (
            <>
                <h2><b>Weather in {capital}</b></h2>
                <p>Temperature {weatherData.current_condition[0].temp_C}°C</p>
                <p>wind {(weatherData.current_condition[0].windspeedKmph / 3.6).toFixed(2)} m/s</p>
            </>
        );
    }
}

export default Weather;