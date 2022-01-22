import React, { Component, useState } from 'react';
import * as THREE from 'three'
// import flights_sample from "./files/flights.json"
import './App.css';
import FlightGlobe from './components/FlightGlobe';

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


function App() {
  const gGlobeMaterial = new THREE.MeshPhongMaterial();
  gGlobeMaterial.color = new THREE.Color( 0xB762C1 );
  const gAtmosphereColor = "#FFCDDD";
  // TODO Handle windows resize
  // TODO Limit zoom range to prevent moire pattern
  // TODO Show space image on rotation?
  // TODO resize
  // TODO Country path boarder
  // TODO Onhover, emphasize?

  const [highlightArc, setHighlightArc] = useState();
  const [highlightPoint, setHighlightPoint] = useState();

  function addOpacity(color, opacity) {
    return color + (Math.round(opacity * 255)).toString(16).padStart(2, '0');
  }

  return (
    <div className="App">
      <FlightGlobe
        airportData={gData}
        flightsData={aData}
      >
      </FlightGlobe>
    </div>
  );
}

export default App;
