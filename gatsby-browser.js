import React from "react";
import { StoreProvider } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";

import store from "./store";

export const wrapRootElement = ({ element }) => {
  return <StoreProvider store={store}>{element}</StoreProvider>
}
