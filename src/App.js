import React, { Component, useState } from 'react';
import * as THREE from 'three'
import countries from "./files/globe-data-min.json";
// import flights_sample from "./files/flights.json"
import './App.css';
import Globe from 'react-globe.gl';
// import FlightCard from './components/FlightCard';

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
      <Globe
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="#7A0BC0"
        atmosphereColor={gAtmosphereColor}
        globeMaterial={gGlobeMaterial}
        atmosphereAltitude={0.25}

        pointsData={gData}
        pointAltitude={(e) => {
          return !highlightPoint ? e.size : e === highlightPoint ? Math.min(e.size * 3, 0.5) : e.size;
        }}
        pointColor={(e) => {
          const opacity = !highlightPoint ? 0.6 : e === highlightPoint ? 0.9 : 0.6;
          return addOpacity(e.color, opacity);
        }}
        pointRadius={(e) => {
          return !highlightPoint ? 0.5 : e === highlightPoint ? 1 : 0.5;
        }}
        pointResolution={20}
        onPointClick={(e) => {
          setHighlightPoint(e);
          // TODO Set upper component selected airport, need a callback here
        }}

        // ? Can show airport info? or sat info
        // onPointHover
        showGraticules={true}
        hexPolygonsData={countries.features}
        hexPolygonColor={() => '#FFBCD1'}
        // TODO Make this 3 in production
        hexPolygonResolution={2}
        hexPolygonsTransitionDuration={200}
        // onHexPolygonHover={(curr) => {
        //   console.log(curr);
        // }}

        // Arcs
        arcsData={aData}
        arcColor={(e) => {
          const opacity = !highlightArc ? 0.6 : e === highlightArc ? 0.9 : 0.4;
          return addOpacity(e.color, opacity);
        }}
        arcAltitude='height'
        arcStroke={(e) => {
          return !highlightArc ? 0.75 : e === highlightArc ? 2 : 0.75;
        }}
        arcCurveResolution={128}
        arcDashLength={1}
        arcDashGap={0.25}
        arcDashAnimateTime={2000}
        arcLabel={(e) => {
          return e.label;
        }}
        arcsTransitionDuration={1000}
        onArcClick={(e) => {
          setHighlightArc(e);
        }}
      />
    </div>
  );
}

export default App;
