import { createStore, action } from "easy-peasy";

const store = createStore({
  searchLabel: '',
  setSearchLabel: action((state, payload) => {
    state.searchLabel = payload;
  }),

  newestYearFilter: null,
  setNewestYearFilter: action((state, payload) => {
    state.newestYearFilter = payload;
  }),

  maxPriceFilter: null,
  setMaxPriceFilter: action((state, payload) => {
    state.maxPriceFilter = payload;
  }),

  maxOwnersFilter: null,
  setMaxOwnersFilter: action((state, payload) => {
    state.maxOwnersFilter = payload;
  }),
});

export default store;