import { atom } from "recoil";

export const showEditMarkerState = atom({
    key: "showEditMarkerState",
    default: false,
});

export const showEditFailState = atom({
    key: "showEditFailState",
    default: false,
});

export const showEditSuccessState = atom({
    key: "showEditSuccessState",
    default: false,
});