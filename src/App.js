import React, { Component, useState, useEffect, useRef } from 'react';
import './App.css';
import * as d3 from 'd3';
import 'antd/dist/antd.css';
import FlightGlobe from './components/FlightGlobe';
import AirportCard from './components/AirportCard';
import FlightCard from './components/FlightCard';
import SearchBox from './components/SearchBox';
import getWeather from './functions/weather';
import getAllFlights from './functions/getFlights';
import { notification } from 'antd';

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });

// const N = 10;
const M = 20;
// const gData = [...Array(N).keys()].map(() => ({
//   lat: (Math.random() - 0.5) * 180,
//   lng: (Math.random() - 0.5) * 360,
//   size: Math.random() / 3,
//   color: [
//     '#FEE3EC',
//     '#F2789F'
//   ][Math.round(Math.random() * 1)],
//   label: ["Hello", 'world', 'im blue', 'im green'][Math.round(Math.random() * 3)],
//   emphasize: false
// }));

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
  const globeEl = useRef();
  const [airports, setAirports] = useState([]); // [{...}], an array of all the airports
  // In iata
  const [selectedAirport, setSelectedAirport] = useState(null); // the airportId
  const [selectedFlight, setSelectedFlight] = useState({ // these are placeholder data
    name: 'placeholder',
    flight_iata: 'FX12',
    dep_airport: 'Kansai International',
    dep_iata: 'KIX',
    arr_airport: 'Indianapolis International',
    arr_iata: 'IND',
    delay: 14,
    arr_time: '2022-01-23T00:26:00+00:00',
    dep_time: '2022-01-23T02:30:00+00:00',
    arr_location: ['40', '40'],
    dep_location: ['60', '60'],
  });
  const [searchBoxIsLoading, setSearchBoxIsLoading] = useState(false); // boolean
  const [selectedAirportData, setSelectedAirportData] = useState({ name: "ORD", temperature: "70", humidity: "60", wind: "50", forecast: "wind", flights: [], lat: 0, lng: 0}); // {...}, the data for the currently selected airport from APIs

  // Initiaization
  useEffect(() => {
    // load data
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse))
    ]).then(([airports]) => {
      setAirports(airports
        .filter(airport => airport.hasOwnProperty('iata') && airport.iata !== "\\N")
        .map(obj => ({
          ...obj, color: [
            '#FEE3EC',
            '#F2789F'][Math.round(Math.random() * 1)],
          size: Math.random() * 0.02 + 0.01
        })
        ) // Add random color and height
      );
      // TODO Call real data here?
      // setSelectedAirport(airports[0].iata);
      // setSelectedAirportData(airports[0]);
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

  let callAirportAPI = async (IATA) => {
    // let lat = 33.44
    // let lon = -94.04
    let [lat, lon] = findGeolocationFromIATA(IATA);
    let API_key = "8eecd0fb86128334073e887977445e60"
    let Flight_API_Keys = ["99f73a2a5be11ab14749ad9e383ca382"];
    let weatherObj = await getWeather(lat, lon, API_key);
    let result = await getAllFlights(IATA, Flight_API_Keys[0], findGeolocationFromIATA);
    // console.log(result);
    // console.log(weatherObj);
    let finalObj = { ...weatherObj, ...result, name: `${findAirportNameFromIATA(IATA)} (${IATA})` };
    console.log(finalObj);
    return finalObj;
  }

  let findGeolocationFromIATA = (IATA) => {
    let airportObj = airports.find(airport => airport.iata === IATA);
    return [airportObj.lat, airportObj.lng];
  }

  let findAirportNameFromIATA = (IATA) => {
    let airportObj = airports.find(airport => airport.iata === IATA);
    return airportObj.name;
  }

  return <div>
    <SearchBox
      onSearchAirport={onSearchAirport}
      airports={airports}
      searchBoxIsLoading={searchBoxIsLoading}
      setSearchBoxIsLoading={setSearchBoxIsLoading}>

    </SearchBox>
    <FlightGlobe
      ref={globeEl}
      airportData={airports}
      flightsData={selectedAirportData.flights}
      setSelectedAirport={onClickAirport}
      selectedAirportIATA={selectedAirport}
      selectedAirportData={selectedAirportData}
      airportLabel="name"

      setSelectedFlight={setSelectedFlight}
      getFlightLabel={(flight) => {
        return `${flight.flight_iata}: ${flight.dep_airport} &rarr; ${flight.arr_airport}`
      }}

      flightDepartureLat={(e) => !e.dep_location ? e.startLat : e.dep_location[0]}
      flightDepartureLng={(e) => !e.dep_location ? e.startLng : e.dep_location[1]}
      flightArrivalLat={(e) => !e.arr_location ? e.endLat : e.arr_location[0]}
      flightArrivalLng={(e) => !e.arr_location ? e.endLng : e.arr_location[1]}
      flightAltitude={null}
    >
    </FlightGlobe>
    <AirportCard
      selectedAirportData={selectedAirportData}
      style={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '10px', position: 'fixed', bottom: 30, left: 30, display: selectedAirport ? 'block' : 'none', color: "#270082" }} />
    <FlightCard
      selectedFlightData={selectedFlight}
      style={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '25px', padding: '10px', position: 'fixed', bottom: 30, right: 30, display: selectedFlight.name == 'placeholder' ? 'none' : 'block', color: "#270082" }} />
  </div>;
};

export default App;
