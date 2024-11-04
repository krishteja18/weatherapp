import React,{useEffect,useState} from 'react';

import "./style.css"

export default function App(props) {

const [weather,setWeather]=useState();
const [loading,setLoading]=useState(false);
const [error,setError]=useState()

const getData=async()=>{
setLoading(true);
try{


const resp=await fetch("https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=kakinada")
const data=await resp.json();
setWeather(data?.list)
}
catch(error){
  setError(error.message)
}
finally{
  setLoading(false)
}



}


console.log(weather)

  return (
    <div className='App'>
    <div className="flexcontainer">
    <span >Weather in your city</span>
    <span style={{marginLeft:"30px"}}><input className="inputspan" /></span>
    <span style={{marginLeft:"10px"}}><button className="search" onClick={getData}>Search</button></span>
 {loading&& <span className="loader"></span>}
 

    </div>
<div className="weatherlist">
 {weather?.slice(0,5).map(item=>{
const {dt_txt,main:{temp_min,temp_max,pressure,humidity}}=item


return (   <div className="weather-table">
<div className="header">Date: {dt_txt}</div>
<div className="temperature-section">
  <div className="temperature-header">Temperature</div>
  <div className="temperature-values">
    <div className="min-max">
      <div>Min</div>
      <div className="value">{temp_min} °C</div>
    </div>
    <div className="min-max">
      <div>Max</div>
      <div className="value">{temp_max} °C</div>
    </div>
  </div>
</div>
<div className="pressure-humidity">
  <div className="row">
    <div>Pressure</div>
    <div className="value">{pressure} hPa</div>
  </div>
  <div className="row">
    <div>Humidity</div>
    <div className="value">{humidity} %</div>
  </div>
</div>
</div>)
 })}
 </div>
    </div>
  );
}

