import React from "react";
import AppYearInput from "./AppYearInput";
import AppOwnersInput from "./AppOwnersInput";
import AppPriceInput from "./AppPriceInput";
import { useStoreActions } from "easy-peasy";

function AppFiltersModal() {
  const setNewestYearFilter = useStoreActions(
    (actions) => actions.setNewestYearFilter
  );
  const setMaxPriceFilter = useStoreActions(
    (actions) => actions.setMaxPriceFilter
  );
  const setMaxOwnersFilter = useStoreActions(
    (actions) => actions.setMaxOwnersFilter
  );

  function resetAllFilters() {
    setNewestYearFilter(null);
    setMaxPriceFilter(null);
    setMaxOwnersFilter(null);
  }

  return (
    <>
      <button
        className="btn btn-outline-dark"
        type="button"
        id="button-addon2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Filters
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Filter results
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                The filters can look better but it's just an example of
                filtering with the Strapi rest api
              </p>
              <AppYearInput></AppYearInput>
              <AppPriceInput></AppPriceInput>
              <AppOwnersInput></AppOwnersInput>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppFiltersModal;
