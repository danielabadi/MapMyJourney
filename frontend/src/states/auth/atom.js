import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const loginRenderState = atom({
  key: "loginRenderState",
  default: true,
});

export const autoLoginState = atom({
    key: "autoLoginState",
    default: false,
  });