import React from "react";
import { useStoreActions } from "easy-peasy";
import { useDebouncedCallback } from 'use-debounce';

function AppSearchInput() {
  const setSearchLabel = useStoreActions((actions) => actions.setSearchLabel);

  const debouncedSetSearchLabel = useDebouncedCallback(
    (value) => {
      setSearchLabel(value);
    },
    700
  );

  return (
    <div className="input-group mb-3 mt-3">
      <input
        type="search"
        className="form-control"
        placeholder="Search cars..."
        aria-label="Search cars..."
        aria-describedby="button-addon2"
        onChange={(e) => debouncedSetSearchLabel(e.target.value)}
      />
      <button className="btn btn-outline-dark" type="button" id="button-addon2">
        Filters
      </button>
    </div>
  );
}

export default AppSearchInput;
