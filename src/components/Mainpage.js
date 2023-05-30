import React, { useState } from "react";
import "./Mainpage.css";
import { ImSearch } from "react-icons/im";
import humidity from "./images/wind.png";
import axios from "axios";
import wind from "./images/wind.png";
import clouds from "./images/unnamed.png"

const Mainpage = () => {
  const [data, setData] = useState({
    celcius: 24,
    name: "Bangalore",
    humidity: 10,
    speed: 2,
   
  });

  const [name, setName] = useState("");
    const [error,setError]=useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}%20&appid=6d082793194c6cf690e4e8eb0e8facb5&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
       
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            
          });
          setError('');
        })
        .catch((err) =>{
          if(err.response.status === 404){
            setError("Invalid City Name")
          } else{
            setError('');
          }
          console.log(err)
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            {" "}
            <div className="searchbtn">
              <ImSearch />
            </div>
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={clouds} className="img" alt="" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} className="humidity" alt="" />
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} className="wind" alt="" />
              <div>
                <p>{Math.round(data.speed)} km/h</p>
                <p>wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
