import React, { Component, useState, useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';
import 'antd/dist/antd.css';
import FlightGlobe from './components/FlightGlobe';
import AirportCard from './components/AirportCard';
import SearchBox from './components/SearchBox';

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

// TODO Auto focus of airport?

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
  const [selectedAirport, setSelectedAirport] = useState(null); // the airportId
  const [selectedFlight, setSelectedFlight] = useState(); // todo: decide what to use to represent an unique flight
  const [searchBoxIsLoading, setSearchBoxIsLoading] = useState(false); // boolean

  useEffect(() => {
    // load data
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse))
    ]).then(([airports]) => {
      setAirports(airports);
    });

  }, []);

  // airportObj: the {...} for the airport
  let onClickAirport = (airportObj) => {
    console.log(airportObj);
    callAirportAPI(airportObj.iata);
    // todo:
    //setSelectedAirport();
  }

  // IATA: the three char string
  let onSearchAirport = (IATA) => {
    callAirportAPI(IATA);
    // todo:

    setSearchBoxIsLoading(false);
    //setSelectedAirport();
  }

  // todo: the API calling function for airport
  let callAirportAPI = (IATA) => {

  }

  return <div>
    <SearchBox
      onSearchAirport={onSearchAirport}
      airports={airports}
      searchBoxIsLoading={searchBoxIsLoading}
      setSearchBoxIsLoading={setSearchBoxIsLoading}>

    </SearchBox>
    <FlightGlobe
      airportData={gData}
      flightsData={aData}
      setSelectedAirport={onClickAirport}
    >
    </FlightGlobe>
    <AirportCard style={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '10px', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none', fontSize: '10px' }} />
    <div style={{ width: 300, height: 300, backgroundColor: 'green', position: 'fixed', bottom: 30, right: 30 }}></div>
  </div>;
};

export default App;
