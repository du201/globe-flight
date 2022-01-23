import React, { Component, useState, useRef, useEffect } from 'react';
import { withSize, sizeMe } from 'react-sizeme'
import * as THREE from 'three'
// import countries from "./files/globe-data-min.json";
// import flights_sample from "./files/flights.json"
// import '../App.css';
import Globe from 'react-globe.gl';
import countries from "../files/globe-data-min.json";
import PropTypes from 'prop-types';
// import FlightCard from './components/FlightCard';

function FlightGlobe(props) {
  const globeEl = useRef();

  const gGlobeMaterial = new THREE.MeshPhongMaterial();
  gGlobeMaterial.color = new THREE.Color( props.colorTheme.sphereColor );
  // TODO Limit zoom range to prevent moire pattern
  // TODO Show space image on rotation?gi
  // TODO Country path boarder
  // TODO Switch planet texture

  const [highlightArc, setHighlightArc] = useState();
  const [highlightPoint, setHighlightPoint] = useState();
  const [pov, setPov] = useState({
    lat: 0,
    lng: 0,
    altitude: 2.5
  });

  useEffect(() => {
    globeEl.current.pointOfView(pov, 1000);
  });

  function addOpacity(color, opacity) {
    return color + (Math.round(opacity * 255)).toString(16).padStart(2, '0');
  }

  return (
    <div className="App">
      <Globe
        ref={globeEl}
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        width={props.size.width}
        // height={Math.round(props.size.height) <= 0 ? props.size.width : props.size.height}
        backgroundColor={props.colorTheme.backgroundColor}

        // Camera control

        // Sphere and atmosphere control
        atmosphereColor={props.colorTheme.atmosphereColor}
        globeMaterial={gGlobeMaterial}
        atmosphereAltitude={0.25}


        pointsData={props.airportData}
        // Todo, change altitude based on the traffic count?
        pointLat={props.airportLat}
        pointLng={props.airportLng}
        pointAltitude={(e) => {
          e.size = !e.size ? 0.01 : e.size;
          return !highlightPoint ? e.size : e === highlightPoint ? Math.min(e.size * 3, 0.5) : e.size;
          return !highlightPoint ? e.size : e === highlightPoint ? 0.5 : e.size;
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
          let label;
          if (props.airportLabel instanceof Function) {
            label = props.airportLabel(e);
          } else {
            label = e[props.airportLabel];
          }
          return `<p class="Globe-Label" style="color:${props.colorTheme.labelColor}">${label}</p>`;
        }}
        onPointClick={(e) => {
          console.log(e);
          setHighlightPoint(e);
          setPov({
            lat: (e.lat - 20) % 90,
            lng: (e.lng + 20) % 180,
            altitude: 2.5
          })
          props.setSelectedAirport(e);
        }}

        showGraticules={true}
        hexPolygonsData={countries.features}
        hexPolygonColor={props.colorTheme.hexPolygonColor}
        // TODO Make this 3 in production
        hexPolygonResolution={2}
        hexPolygonsTransitionDuration={200}
        // onHexPolygonHover={(curr) => {
        //   console.log(curr);
        // }}

        // Arcs
        arcsData={props.flightsData}
        arcStartLat={props.flightDepartureLat}
        arcStartLng={props.flightDepartureLng}
        arcEndLat={props.flightArrivalLat}
        arcEndLng={props.flightArrivalLng}
        arcColor={(e) => {
          const opacity = !highlightArc ? 0.6 : e === highlightArc ? 0.9 : 0.4;
          return addOpacity(e.color, opacity);
        }}
        arcAltitude={props.flightAltitude}
        arcStroke={(e) => {
          return !highlightArc ? 0.75 : e === highlightArc ? 2 : 0.75;
        }}
        arcCurveResolution={128}
        arcDashLength={1}
        arcDashGap={0.25}
        arcDashAnimateTime={2000}
        arcLabel={(e) => {
          return `<p class="Globe-Label" style="color:${props.colorTheme.labelColor}">${e.label}</p>`;
        }}
        arcsTransitionDuration={1000}
        onArcClick={(e) => {
          setHighlightArc(e);
          console.log(e);
          setPov({
            lat: ((e.startLat + e.endLat)/2 - 5) % 90,
            lng: ((e.startLng + e.endLng)/2 - 5) % 180,
            altitude: 2.5
          })
          props.setSelectedAirport(e);
        }}
      />
    </div>
  );
}

// Types for propp
FlightGlobe.propTypes = {
  airportData: PropTypes.array.isRequired,
  flightsData: PropTypes.array.isRequired,
  colorTheme: PropTypes.shape({
    backgroundColor: PropTypes.string,
    sphereColor: PropTypes.string,
    atmosphereColor: PropTypes.string,
    // airportColors = PropTypes.arrayOf(PropTypes.string),
    hexPolygonColor: PropTypes.oneOfType(PropTypes.string, PropTypes.func),
    // flightColors = PropTypes.arrayOf(PropTypes.string),
    labelColor:PropTypes.string,
  }),
  // Callbacks to upper
  setSelectedFlight: PropTypes.func,
  setSelectedAirport: PropTypes.func,
  airportLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  airportLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  airportLabel: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightDepartureLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightDepartureLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightArrivalLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightArrivalLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightAltitude: PropTypes.oneOfType(PropTypes.number, PropTypes.func, PropTypes.string)
}

FlightGlobe.defaultProps = {
  setSelectedFlight: () => {},
  setSelectedAirport: () => {},
  airportLat: 'lat',
  airportLng: 'lng',
  airportLabel: 'label',
  flightDepartureLat: 'startLat',
  flightDepartureLng: 'startLng',
  flightArrivalLat: 'endLat',
  flightArrivalLng: 'endLng',
  flightAltitude: 'height',
  colorTheme: {
    backgroundColor: "#7A0BC0",
    sphereColor: "#B762C1",
    atmosphereColor: "#FFCDDD",
    hexPolygonColor: () => "#FFBCD1",
    labelColor: "#270082"
  }
}

export default withSize({ monitorHeight:true })(FlightGlobe);
