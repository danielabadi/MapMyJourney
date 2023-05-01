import { atom } from "recoil";

export const markersState = atom({
    key: "markersState",
    default: [],
});

export const showAddFailState = atom({
    key: "showAddFailState",
    default: false,
});

export const showAddSuccessState = atom({
    key: "showAddSuccessState",
    default: false,
});