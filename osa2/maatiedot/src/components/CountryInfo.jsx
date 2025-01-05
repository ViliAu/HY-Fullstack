import CountryCard from "./CountryCard";
import SimpleCountry from "./SimpleCountry";

const CountryInfo = ({countries, search, setSearch}) => {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()));
    if (filteredCountries.length > 10) {
        return <>
            <p>Too many matches, specify another filter</p>
        </>
    }
    else if (filteredCountries.length > 1) {
        return <>
            {...filteredCountries.map(c => <SimpleCountry name={c.name.common} setSearch={setSearch} />)}
        </>
    }
    else if (filteredCountries.length == 1) {
        const c = filteredCountries[0];
        return <CountryCard country={c} />
    }
    else {
        return <p>No countries found, specify another filter</p>
    }
}

export default CountryInfo;