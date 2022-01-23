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

  const [useOwnSelected, setUseOwnSelected] = useState(false);
  const [highlightArc, setHighlightArc] = useState();
  // const [highlightPoint, setHighlightPoint] = useState();
  const [pov, setPov] = useState({
    lat: 0,
    lng: 0,
    altitude: 2.5
  });

  // Bind directional light to camera
  useEffect(() => {
    let scene = globeEl.current.scene();
    let light = scene.getObjectByProperty("type", "DirectionalLight");
    if (light) {
      scene.remove(light);
      globeEl.current.camera().add(light);
      scene.add(globeEl.current.camera());
    }
  });

  useEffect(() => {
    // console.log(pov);
    globeEl.current.pointOfView(pov, 1000);
  }, [pov]);

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

        // Sphere and atmosphere control
        atmosphereColor={props.colorTheme.atmosphereColor}
        globeMaterial={gGlobeMaterial}
        atmosphereAltitude={0.25}

        // Airport control
        pointsData={props.airportData}
        // Todo, change altitude based on the traffic count?
        pointLat={props.airportLat}
        pointLng={props.airportLng}
        pointAltitude={(e) => {
          e.size = !e.size ? 0.01 : e.size;
          // return !props.selectedAirportIATA ? e.size : e.iata == props.selectedAirportIATA ? 0.1 : e.size;
          return !props.selectedAirportIATA ? e.size : e.iata === props.selectedAirportIATA ? Math.min(e.size * 7, 0.5) : e.size;
          // return !selectedAirport ? e.size : e === selectedAirport ? 0.5 : e.size;
        }}
        pointColor={(e) => {
          const opacity = !props.selectedAirportIATA ? 0.6 : e.iata === props.selectedAirportIATA ? 0.9 : 0.6;
          return addOpacity(e.color, opacity);
        }}
        pointRadius={(e) => {
          return !props.selectedAirportIATA ? 0.5 : e.iata === props.selectedAirportIATA ? 0.7 : 0.5;
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
          setPov({
            lat: (e.lat - 20) % 90,
            lng: (e.lng + 20) % 180,
            altitude: 2.5
          });
          // setHighlightPoint(e);
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
          let color = props.selectedAirportIATA === e.iata ? "#FFADAD" : "#FFDAC7";
          const opacity = !highlightArc ? 0.6 : e === highlightArc ? 0.9 : 0.4;
          return addOpacity(color, opacity);
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
          let label = props.getFlightLabel(e);
          return `<p class="Globe-Label" style="color:${props.colorTheme.labelColor}">${label}</p>`;
        }}
        arcsTransitionDuration={1000}
        onArcClick={(e) => {
          console.log(e);

          // let meanLng;
          // if (0 <= e.startLng && e.startLng <= 180 && e.endLng <= 0 && e.endLng >= -180) {
          //   let endLng = 180 + e.endLng;
          //   meanLng = (e.startLng + endLng)/2;
          //   meanLng = meanLng > 180 ? meanLng - 360 : meanLng;
          // } else if (0 <= e.endLng && e.endLng <= 180 && e.startLng <= 0 && e.startLng >= -180) {
          //   let startLng = 180 + e.startLng;
          //   meanLng = (startLng + e.endLng)/2;
          //   meanLng = meanLng > 180 ? meanLng - 360 : meanLng;
          // } else {
          //   meanLng = ((e.startLng + e.endLng)/2) % 180;
          // }
          setPov({
            lat: (((e.startLat + e.endLat)/3) - (Math.random() * 5 + 5)) % 90,
            lng: (e.startLng + Math.random() * 10),
            altitude: 2.5
          });
          setHighlightArc(e);
          props.setSelectedAirport(e);
        }}
      />
    </div>
  );
}

// Types for propp
FlightGlobe.propTypes = {
  airportData: PropTypes.array.isRequired,
  flightsData: PropTypes.array,
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
  // Selected airport from top component
  selectedAirportIATA: PropTypes.string,
  selectedAirportData: PropTypes.object,
  airportLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  airportLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  airportLabel: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightDepartureLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightDepartureLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightArrivalLat: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightArrivalLng: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  flightAltitude: PropTypes.oneOfType(PropTypes.number, PropTypes.func, PropTypes.string),
  getFlightLabel: PropTypes.func
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
  flightAltitude: null,
  getFlightLabel: (e) => e.label,
  colorTheme: {
    backgroundColor: "#7A0BC0",
    sphereColor: "#B762C1",
    atmosphereColor: "#FFCDDD",
    hexPolygonColor: () => "#FFBCD1",
    labelColor: "#270082"
  }
}

export default withSize({ monitorHeight:true })(FlightGlobe);
