import React from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStoreActions } from "easy-peasy";

function AppYearInput() {
  const YEAR_MIN = 1980;
  const YEAR_MAX = 2024;
  const setNewestYearFilter = useStoreActions(
    (actions) => actions.setNewestYearFilter
  );
  const [inputError, setInputError] = useState(false);

  const debouncedSetNewestYearFilter = useDebouncedCallback((value) => {
    if (value === "") {
      setInputError(false);
      setNewestYearFilter(null);
      return;
    }
    if (value < YEAR_MIN || value > YEAR_MAX) {
      setInputError(true);
      setNewestYearFilter(null);
      return;
    }
    setInputError(false);
    setNewestYearFilter(value);
  }, 700);

  return (
    <div className="mb-3">
      <div className={`form-floating ${inputError && "is-invalid"}`}>
        <input
          id="yearInput"
          type="number"
          min={1980}
          max={2024}
          step={1}
          className={`form-control ${inputError && "is-invalid"}`}
          placeholder="Older than"
          onChange={(e) => debouncedSetNewestYearFilter(e.target.value)}
        />
        <label htmlFor="yearInput">Older than</label>
      </div>
      <label className="invalid-feedback" htmlFor="yearInput">
        Year has to be between 1980 and 2024
      </label>
    </div>
  );
}

export default AppYearInput;
