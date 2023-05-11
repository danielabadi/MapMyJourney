import { atom } from "recoil";

export const showAddMarcadorState = atom({
  key: "showAddMarcadorState",
  default: false,
});

export const showEditPerfilState = atom({
  key: "showEditPerfilState",
  default: false,
});

export const showMarkersListState = atom({
  key: "showMarkersListState",
  default: false,
});

export const showFilterState = atom({
  key: "showFilterState",
  default: false,
});

export const filterState = atom({
  key: "filterState",
  default: ['ja fui', 'planejado', 'quero ir'],
});
