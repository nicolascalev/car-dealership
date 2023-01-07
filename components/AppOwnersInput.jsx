import React from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStoreActions } from "easy-peasy";

function AppOwnersInput() {
  const OWNER_MIN = 0;
  const setMaxOwnersFilter = useStoreActions(
    (actions) => actions.setMaxOwnersFilter
  );
  const [inputError, setInputError] = useState(false);

  const debouncedSetMaxOwnersFilter = useDebouncedCallback((value) => {
    if (value === "") {
      setInputError(false);
      setMaxOwnersFilter(null);
      return;
    }
    if (value < OWNER_MIN) {
      setInputError(true);
      setMaxOwnersFilter(null);
      return;
    }
    setInputError(false);
    setMaxOwnersFilter(value);
  }, 700);

  return (
    <div className="mb-3">
      <div className={`form-floating ${inputError && "is-invalid"}`}>
        <input
          id="maxOwnerCountInput"
          type="number"
          min={0}
          className={`form-control ${inputError && "is-invalid"}`}
          placeholder="Max owner count"
          onChange={(e) => debouncedSetMaxOwnersFilter(e.target.value)}
        />
        <label htmlFor="maxOwnerCountInput">Max owner count</label>
      </div>
      <label className="invalid-feedback" htmlFor="maxOwnerCountInput">
        Owner count has to be equal or higher than 0
      </label>
    </div>
  );
}

export default AppOwnersInput;
