import { atom } from "recoil";

export const zoomState = atom({
  key: "zoomState",
  default: {center: [0,0], zoom: 3}
});
