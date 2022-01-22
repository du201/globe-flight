import logo from './logo.svg';
import * as THREE from 'three'
import countries from "./files/globe-data.json";
import flights_sample from "./files/flights.json"
import './App.css';
import Globe from 'react-globe.gl';

function App() {
  const N = 20;
  const M = 50;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: [
      '#F9C5D5',
      '#F999B7',
      '#F2789F'
    ][Math.round(Math.random() * 3)],
    label: ["Hello", 'world', 'im blue', 'im green'][Math.round(Math.random() * 3)]
  }));
  
  // TODO Auto focus of airport?

  // Sample arc data
  const aData = [...Array(M).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    height: Math.random() * 0.5
  }));
  const globeMaterial = new THREE.MeshPhongMaterial();
  globeMaterial.color = new THREE.Color( 0xB762C1 );
  const atmosphereColor = "#FFCDDD";
  // TODO Handle windows resize
  // TODO Limit zoom range to prevent moire pattern
  // TODO Show space image on rotation?
  return (
    <div className="App">
      <Globe
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="#7A0BC0"
        atmosphereColor={atmosphereColor}
        globeMaterial={globeMaterial}
        atmosphereAltitude={0.5}

        pointsData={gData}
        pointAltitude="size"
        pointColor="color"
        // todo make this a react component
        pointLabel={(e) => {
          console.log(e);
          // TODO Return react component here?
        }}
        pointResolution={20}

        // ? Can show airport info? or sat info
        // onPointHover
        showGraticules={true}
        atmosphereAltitude={0.15}
        hexPolygonsData={countries.features}
        hexPolygonColor={(e) => {return '#FFBCD1';}}
        // hexPolygonResolution={5}
        hexPolygonsTransitionDuration={400}
        // onHexPolygonHover={(curr) => {
        //   console.log(curr);
        // }}

        // Arcs
        arcsData={aData}
        arcColor={() => {return ["#FFADAD", "#FFDAC7"][Math.round(Math.random() * 1)];}}
        arcAltitude='height'
        arcStroke={0.75}
        arcDashLength={1}
        arcDashGap={1}
        arcDashAnimateTime={1000}
        arcsTransitionDuration={1000}
      />
    </div>
  );
}

export default App;
