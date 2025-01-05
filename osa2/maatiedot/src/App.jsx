import { useEffect, useState } from 'react'
import Search from './components/Search';
import CountryInfo from './components/CountryInfo';

function App() {
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all');
      const data = await res.json();
      setCountryData(data);
    }
    fetchCountries();
  }, [])
  
  return (
    <>
      <Search search={search} setSearch={setSearch}/>
      <CountryInfo countries={countryData} search={search} setSearch={setSearch} />
    </>
  )
}

export default App
