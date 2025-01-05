import { useEffect, useState } from "react";
import Weather from "./Weather";

const CountryCard = ({country}) => {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const res = await fetch(`https://wttr.in/${country.capital[0]}?format=j1`);
            const data = await res.json();
            setWeather(data);
        }
        getWeather();
    }, []);

    return <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p><b>languages:</b></p>
        <ul>
            {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
        </ul>
        <img src={Object.values(country.flags)[0]} />
        <Weather capital={country.capital[0]} weatherData={weather} />
    </>
}

export default CountryCard;
