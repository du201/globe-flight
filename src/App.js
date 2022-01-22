import logo from './logo.svg';
import './App.css';
import Globe from 'react-globe.gl';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import indexBy from 'index-array-by';
import { Input, AutoComplete } from 'antd';
import 'antd/dist/antd.css';

const { useState, useEffect, useRef } = React;


const COUNTRY = 'Portugal';
const MAP_CENTER = { lat: 37.6, lng: -16.6, altitude: 0.4 };
const OPACITY = 0.3;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment });


function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

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
    </AutoComplete>
  );
};

const App = () => {
  const globeEl = useRef();
  const [airports, setAirports] = useState([]);
  // const [routes, setRoutes] = useState([]);
  const [hoverArc, setHoverArc] = useState();

  const [selectedAirport, setSelectedAirport] = useState();
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
    <div style={{ width: 300, height: 300, backgroundColor: 'blue', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none' }}></div>
    <div style={{ width: 300, height: 300, backgroundColor: 'green', position: 'fixed', bottom: 30, right: 30 }}></div>
  </div>;
};

export default App;
