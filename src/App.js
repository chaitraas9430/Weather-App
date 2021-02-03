import React, { Component } from 'react';
import { WEATHER_API } from './api';
import './App.css';

const CITY = 'London';
const API_KEY = 'b1232264ac230fd6764036c30bfe563b';

class WeatherApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      report: [],
      isLoading: true,
      isError: false
    }
  }
  componentDidMount() {
    fetch(`${WEATHER_API}?q=${CITY}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          reports: response.list,
          isLoading: false
        })
      }).catch(e => {
        this.setState({
          isError: true,
          isLoading: false
        })
      })
  }

  render() {
    const { isError, isLoading, reports } = this.state;
    return (
      <div className="wrapper">
        <h1>Weather App</h1>
        <h3>5 Latest Reports - London</h3>
        { isError && <div>Oops! Something went wrong!!!</div> }
        {isLoading ? <div>Fetching Results...</div> : 
        <div>
          <div className='d-f'>
          {reports.map(report => {
            return <div className="reports" >
              <div className="date"><strong>Date: </strong>{report.dt_txt}</div>
              <div className='card'>
                <strong>Current Temp:</strong>
                <div className="reportVal">{report.main.temp}</div>
              </div>
              <div className='card'>
                <strong>Max Temp:</strong>
                <div className="reportVal">{report.main.temp_max}</div>
              </div>
              <div className='card'>
                <strong>Min Temp:</strong>
                <div className="reportVal">{report.main.temp_min}</div>
              </div>
              <div className='card'>
                <strong>Humidity:</strong>
                <div className="reportVal">{report.main.humidity}</div>
              </div>
              <div className='card'>
                <strong>Pressure:</strong>
                <div className="reportVal">{report.main.pressure}</div>
              </div>
            </div>
            
          })}
          </div>
        </div> 
        }
      </div>
    );
  }
}

export default WeatherApp;