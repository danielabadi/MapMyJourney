import React from "react";
import "./Map.css";
import * as Leaflet from "leaflet";

function Map() {

    const mapRef = React.useRef(null);
    React.useEffect(() => {
        if (mapRef.current == null) {
          mapRef.current = Leaflet.map("pageMap-map", {
            center: [0, 0],
            zoom: 3,
            maxZoom: 18,
            minZoom: 2,
            zoomSnap: 1,
            worldCopyJump: true,
            maxBounds: [
              [-90, -180],
              [90, 180],
            ],
            maxBoundsViscosity: 1.0,
          });
          Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(mapRef.current);
        }
    });

    return (
        <div className='pageMap'>
            <div className='pageMap-map' id='pageMap-map'></div>

        </div>
    )
}

export default Map;