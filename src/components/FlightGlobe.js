import React, { Component, useState, useEffect } from 'react';
import { withSize, sizeMe } from 'react-sizeme'
import * as THREE from 'three'
// import countries from "./files/globe-data-min.json";
// import flights_sample from "./files/flights.json"
// import '../App.css';
import Globe from 'react-globe.gl';
import countries from "../files/globe-data-min.json";
// import FlightCard from './components/FlightCard';

function FlightGlobe(props) {
  // TODO Specify props field?
  // TODO Enum the color?
  const gGlobeMaterial = new THREE.MeshPhongMaterial();
  gGlobeMaterial.color = new THREE.Color( 0xB762C1 );
  const gAtmosphereColor = "#FFCDDD";
  // TODO Limit zoom range to prevent moire pattern
  // TODO Show space image on rotation?gi
  // TODO Country path boarder

  const [highlightArc, setHighlightArc] = useState();
  const [highlightPoint, setHighlightPoint] = useState();

  function addOpacity(color, opacity) {
    return color + (Math.round(opacity * 255)).toString(16).padStart(2, '0');
  }

  return (
    <div className="App">
      <Globe
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        width={props.size.width}
        // height={Math.round(props.size.height) <= 0 ? props.size.width : props.size.height}
        backgroundColor="#7A0BC0"
        atmosphereColor={gAtmosphereColor}
        globeMaterial={gGlobeMaterial}
        atmosphereAltitude={0.25}

        pointsData={props.airportData}
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
        pointLabel={(e) => {
          return `<p class="Globe-Label">${e.label}</p>`;
        }}
        onPointClick={(e) => {
          setHighlightPoint(e);
          // TODO Set upper component selected airport, need a callback here
        }}

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
        arcsData={props.flightsData}
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
          return `<p class="Globe-Label">${e.label}</p>`;
        }}
        arcsTransitionDuration={1000}
        onArcClick={(e) => {
          setHighlightArc(e);
        }}
      />
    </div>
  );
}

export default withSize({ monitorHeight:true })(FlightGlobe);
