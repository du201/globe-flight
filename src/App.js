import React, { Component, useState, useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';
import 'antd/dist/antd.css';
import FlightGlobe from './components/FlightGlobe';
import AirportCard from './components/AirportCard';
import FlightCard from './components/FlightCard';
import SearchBox from './components/SearchBox';
import getWeather from './functions/weather';
import { notification } from 'antd';

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });

const N = 10;
const M = 20;
const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() / 3,
  color: [
    '#FEE3EC',
    '#F2789F'
  ][Math.round(Math.random() * 1)],
  label: ["Hello", 'world', 'im blue', 'im green'][Math.round(Math.random() * 3)],
  emphasize: false
}));

// Sample arc data
const aData = [...Array(M).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  height: Math.random() * 0.5,
  label: ["Hello", 'world', 'im blue', 'im green'][Math.round(Math.random() * 3)],
  color: ["#FFADAD", "#FFDAC7"][Math.round(Math.random() * 1)],
  emphasize: false
}));

const App = () => {
  const [airports, setAirports] = useState([]); // [{...}], an array of all the airports
  // In iata
  const [selectedAirport, setSelectedAirport] = useState("ORD"); // the airportId
  const [selectedFlight, setSelectedFlight] = useState(null); // todo: decide what to use to represent an unique flight
  const [searchBoxIsLoading, setSearchBoxIsLoading] = useState(false); // boolean
  const [selectedAirportData, setSelectedAirportData] = useState(null); // {...}, the data for the currently selected airport from APIs

  useEffect(() => {
    // load data
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse))
    ]).then(([airports]) => {
      setAirports(airports
        .filter(airport => airport.hasOwnProperty('iata') && airport.iata !== "\\N")
        .map(obj => ({...obj, color: [
          '#FEE3EC',
          '#F2789F'][Math.round(Math.random() * 1)],
          size: Math.random() * 0.1 + 0.1})
          ) // Add random color and height
        );
    });

  }, []);

  // airportObj: the {...} for the airport
  let onClickAirport = (airportObj) => {
    callAirportAPI(airportObj.iata).then(result => {
      setSelectedAirportData(result);
      setSelectedAirport(airportObj.iata);
    }).catch(error => {
      notification.open({
        message: 'Retrieving Airport Info Failed',
        duration: 3,
        description:
          'Due to internet issue, retrieving airport info failed. Please try again.'
      });
    });
  }

  // IATA: the three char string
  let onSearchAirport = (IATA) => {
    setSearchBoxIsLoading(true);
    callAirportAPI(IATA).then(result => {
      setSelectedAirportData(result);
      setSelectedAirport(IATA);
      setSearchBoxIsLoading(false);
    }).catch(error => {
      notification.open({
        message: 'Retrieving Airport Info Failed',
        duration: 3,
        description:
          'Due to internet issue, retrieving airport info failed. Please try again.'
      });
      setSearchBoxIsLoading(false);
    });
  }

  // todo: the API calling function for airport
  let callAirportAPI = async (IATA) => {
    let lat = 33.44
    let lon = -94.04
    let API_key = "8eecd0fb86128334073e887977445e60"
    await getWeather(lat, lon, API_key);
  }

  return <div>
    <SearchBox
      onSearchAirport={onSearchAirport}
      airports={airports}
      searchBoxIsLoading={searchBoxIsLoading}
      setSearchBoxIsLoading={setSearchBoxIsLoading}>

    </SearchBox>
    <FlightGlobe
      airportData={airports}
      flightsData={aData}
      setSelectedAirport={onClickAirport}
      selectedAirportIATA={selectedAirport}
      airportLabel="name"
    >
    </FlightGlobe>
    <AirportCard style={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '10px', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none' }} />
    <FlightCard style={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '10px', position: 'fixed', bottom: 30, right: 30, display: selectedFlight ? 'block' : 'none' }} />
  </div>;
};

export default App;
