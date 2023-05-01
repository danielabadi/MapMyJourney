import * as Leaflet from "leaflet";
import iconBlue from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconGreen from "./marker-icon-green.png";
import iconYellow from "./marker-icon-yellow.png";
import iconGrey from "./marker-icon-grey.png";

export const IconBlue = Leaflet.icon({
    iconUrl: iconBlue,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
});

export const IconGreen = Leaflet.icon({
    iconUrl: iconGreen,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
});

export const IconYellow = Leaflet.icon({
    iconUrl: iconYellow,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
});

export const IconGrey = Leaflet.icon({
    iconUrl: iconGrey,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
});
