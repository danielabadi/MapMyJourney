import React from "react";
import "./Map.css";
import * as Leaflet from "leaflet";
import { useRecoilState } from "recoil";
import { markersState } from "../../states/markers/atom";
import apiClient from "../../services/apiClient";
import { IconBlue, IconGreen, IconYellow, IconGrey } from "../../utils/Markers";

function Map() {
    const [markers, setMarkers] = useRecoilState(markersState);
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
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

            layerRef.current = Leaflet.layerGroup().addTo(mapRef.current);
        }
    });

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get("/markers", {
                    withCredentials: true,
                });
                setMarkers([...response.data.data]);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        layerRef.current.clearLayers();
        markers.forEach((element) => {
            Leaflet.Marker.prototype.options.icon = getIcon(element.status);
            Leaflet.marker([element.lat, element.lng])
                .addTo(layerRef.current)
        });
    }, [markers]);

    function getIcon(status) {
        return status === "ja fui"
          ? IconBlue
          : status === "quero ir"
            ? IconGreen
            : IconYellow;
      }

    return (
        <div className='pageMap'>
            <div className='pageMap-map' id='pageMap-map'></div>

        </div>
    )
}

export default Map;