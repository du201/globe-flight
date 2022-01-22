import React, { Component, useState, useEffect } from 'react';
import * as THREE from 'three'
// import flights_sample from "./files/flights.json"
import './App.css';
import Globe from 'react-globe.gl';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import indexBy from 'index-array-by';
import { Input, AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import FlightGlobe from './components/FlightGlobe';
import AirportCard from './components/AirportCard';

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });

const Complete = ({ setSelectedAirport }) => {
  const [options, setOptions] = useState([{
    value: "IND",
  }, {
    value: "ORD",
  }, {
    value: "NYC",
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (value) => {
    console.log('onSearch', value);
    setIsLoading(true);
    setTimeout(airportDataCB, 2000);
  };

  const airportDataCB = (data) => {
    setIsLoading(false);
    setSelectedAirport({ data: 'fake' });
  }

  /**
   * callback func when an airport on the map is clicked
   */
  const mapClickAirportCB = (IATA) => {

  }

  /**
   * callback func when an airport on the map is clicked
   */
  const mapClickFlightCB = (IATA) => {

  }

  return (
    // <AutoComplete
    //   dropdownMatchSelectWidth={252}
    //   options={options}
    //   onSelect={onSelect}
    //   onSearch={handleSearch}
    //   style={{
    //     position: 'fixed', top: 30, zIndex: 10, left: '50%',
    //     transform: 'translateX(-50%)'
    //   }}
    // >
    //   <Input.Search size="large" placeholder="search for airports" enterButton style={{}} onSearch={value => console.log(value)} />
    // </AutoComplete>

    <AutoComplete
      options={options}
      style={{
        position: 'fixed', top: 30, zIndex: 10, left: '50%',
        transform: 'translateX(-50%)', width: '30%'
      }}
    >
      <Input.Search size="large" placeholder="search for airports" enterButton style={{}} onSearch={onSearch} loading={isLoading} />
    </AutoComplete>)
}


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
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState();

  useEffect(() => {
    // load data
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse))
    ]).then(([airports]) => {

      // const byIata = indexBy(airports, 'iata', false);
      setAirports(airports);
    });

  }, []);

  return <div>
    <Complete setSelectedAirport={setSelectedAirport}></Complete>
    <FlightGlobe
      airportData={gData}
      flightsData={aData}
    >
    </FlightGlobe>
    <AirportCard style={{ backgroundColor: 'white', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none', fontSize: '10px', flexShrink: 2 }} />
    {/* <div style={{ width: 300, height: 300, backgroundColor: 'blue', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none' }}></div> */}
    <div style={{ width: 300, height: 300, backgroundColor: 'green', position: 'fixed', bottom: 30, right: 30 }}></div>
  </div>;
};

export default App;
