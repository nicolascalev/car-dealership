import { createStore, action } from "easy-peasy";

const store = createStore({
  searchLabel: '',
  setSearchLabel: action((state, payload) => {
    state.searchLabel = payload;
  })
});

export default store;