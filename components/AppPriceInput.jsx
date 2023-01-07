import React from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStoreActions } from "easy-peasy";

function AppPriceInput() {
  const MIN_MAX_PRICE = 1000;
  const setMaxPriceFilter = useStoreActions(
    (actions) => actions.setMaxPriceFilter
  );
  const [inputError, setInputError] = useState(false);

  const debouncedSetMaxPriceFilter = useDebouncedCallback((value) => {
    if (value === "") {
      setInputError(false);
      setMaxPriceFilter(null);
      return;
    }
    if (value < MIN_MAX_PRICE) {
      setInputError(true);
      setMaxPriceFilter(null);
      return;
    }
    setInputError(false);
    setMaxPriceFilter(value);
  }, 700);

  return (
    <div className="mb-3">
      <div className={`form-floating ${inputError && "is-invalid"}`}>
        <input
          id="maxPriceInput"
          type="number"
          min={1000}
          className={`form-control ${inputError && "is-invalid"}`}
          placeholder="Max price USD"
          onChange={(e) => debouncedSetMaxPriceFilter(e.target.value)}
        />
        <label htmlFor="maxPriceInput">Max price USD</label>
      </div>
      <label className="invalid-feedback" htmlFor="maxPriceInput">
        Minimum price has to be higher than $1000
      </label>
    </div>
  );
}

export default AppPriceInput;
