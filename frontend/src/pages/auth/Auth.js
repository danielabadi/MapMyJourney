import { useRecoilValue } from "recoil";
import { loginRenderState } from "../../states/auth/atom";
import React from "react";
import * as Leaflet from 'leaflet';
import "./Auth.css";
import Login from "./components/Login/Login";

function Auth() {
  const loginRender = useRecoilValue(loginRenderState);
  const mapRef = React.useRef(null);
  const layerRef = React.useRef(null);
  React.useEffect(() => {
    if (mapRef.current == null) {
        mapRef.current = Leaflet.map("background", {
            center: [0, 0],
            zoom: 3,
            maxZoom: 3,
            minZoom: 3,
            zoomSnap: 1,
            zoomControl: false,
            dragging: false,
            doubleClickZoom: false
        });
        Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef.current);

        layerRef.current = Leaflet.layerGroup().addTo(mapRef.current);
    }
}, []);

  return (
    <>
    <div className='background' id="background"></div>
    <div className='image'>
        {loginRender && <Login />}
        {!loginRender && <>Register</>}
      </div>
    </>
  );
}

export default Auth;