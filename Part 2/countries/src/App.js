import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Search = ({searchCallBack}) =>{
  return(
    <div>
      Find Countries: 
      <input type="search" onChange={searchCallBack} />
    </div>
  )
}

const ShowResults = ({countries}) =>{
  if(countries.length > 10){
    return(
      <div>Too many matches, specify another filter </div>
    )
  }
  else if(countries.length === 1){
    //show country info
    return(
      <SingleCountryInfo country={countries[0]} />
    )
  }
  else{
    //display names of countries
    return(
      <div>
        <ul>
          {countries.map((country,i) =>
            <li key={i}> <CountryInfo country={country} /> </li>
          )}
        </ul>
      </div>
    )
  }
}

const CountryInfo = ({country}) =>{
  const[showInfo, setShowInfo] = useState(false)

  const changeShowStatus = () =>{
    const show = (showInfo) ? false:true;
    setShowInfo(show)
  }
  if(!showInfo){
      return(
      <div>
        <div>{country.name} <button onClick={changeShowStatus}> Show </button> </div>
      </div>
    )
  }
  else{
    return(
      <div>
        <SingleCountryInfo country={country} /> 
        <button onClick={changeShowStatus}>Hide</button>
      </div>
    )
  } 
}

const SingleCountryInfo = ({country}) =>{
  const[weather,setWeather] = useState({})

  //get weather data from API
  const weatherHook = () => {
    const key = '?access_key=' + process.env.REACT_APP_API_KEY;
    const query = '&query=' + country.capital
    const request = 'http://api.weatherstack.com/current' + key + query
    //console.log(key)
    //console.log(request)
    const promise = axios.get(request);
    //console.log(promise)
    promise.then(response =>{
      //console.log(response.data)
      setWeather(response.data)
    })
  }
  useEffect(weatherHook,[])

  return(
    <div>
      <h2>{country.name} </h2>
      <div><label>Capital: </label> {country.capital} </div>
      <div><label>Population: </label> {country.population} </div>
      <h3>Languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} height="100" width="100"/>
      <WeatherInfo weatherData={weather} />
    </div>
  )
}

const Languages = ({languages}) =>{
  return(
    <ul>
      {languages.map((lang,i) =>
        <li key={i}> {lang.name} </li> 
      )}
    </ul>
  )
}

const WeatherInfo = ({weatherData}) =>{
  return(
    <div>
      <h2> Weather in {weatherData.location.name} </h2>
      <div><b>Temperature: </b> {weatherData.current.temperature}</div>
      <img src={weatherData.current.weather_icons} height="60" width="60"/>
      <div><b>Wind: </b> {weatherData.current.wind_speed}, direction: {weatherData.current.wind_dir} </div>
    </div>
  )
}

function App() {
  const[allCountries,setCountries] = useState([])
  const[showCountries, setShowCountries] = useState([])
  const [searchVal, setSearchVal] = useState('')

  //get the country data from API
  const hook = () =>{
    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(response =>{
      setCountries(response.data)
    })
  }
  useEffect(hook,[])

  //call back funtion for the search bar
  const searchValueChange = (event) =>{
      const searchVal = event.target.value.toLowerCase();
      if(searchVal === ''){
        //nothing to show
        setShowCountries([]) 
      }
      else{
        //countries to show
        const toShow = allCountries.filter(
          country => country.name.toLowerCase().includes(searchVal))
        setShowCountries(toShow)
      }
  }
  return (
    <div>
      <Search searchCallBack={searchValueChange} />
      <ShowResults countries={showCountries} />
    </div>
  );
}

export default App;
