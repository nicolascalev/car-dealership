import React from "react";
import { useStore, useStoreState } from "easy-peasy";

function AppActiveFilters() {
  const newestYearFilter = useStoreState((state) => state.newestYearFilter);
  const maxPriceFilter = useStoreState((state) => state.maxPriceFilter);
  const maxOwnersFilter = useStoreState((state) => state.maxOwnersFilter);

  return (
    <div className="d-flex mb-3" style={{ gap: "5px" }}>
      {newestYearFilter && (
        <span class="badge rounded-pill text-bg-light">
          Filter active: Year
        </span>
      )}
      {maxPriceFilter && (
        <span class="badge rounded-pill text-bg-light">
          Filter active: Price
        </span>
      )}
      {maxOwnersFilter && (
        <span class="badge rounded-pill text-bg-light">
          Filter active: Owners
        </span>
      )}
      {!newestYearFilter && !maxPriceFilter && !maxOwnersFilter && (
        <span class="badge rounded-pill text-bg-light">No filters active</span>
      )}
    </div>
  );
}

export default AppActiveFilters;
