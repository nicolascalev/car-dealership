import * as React from "react";
import AppCarList from "../../components/AppCarList";
import AppSearchInput from "../../components/AppSearchInput";
import AppActiveFilters from "../../components/AppActiveFilters";

const IndexPage = () => {
  return (
    <main className="pb-5 container-fluid">
      <div className="bg-light row py-5">
        <div className="d-none d-md-block col-3"></div>

        <div className="col-12 col-md-6">
          <p className="h1 text-center">🚗</p>
          <h1 className="display-5">
            Car dealership demo with Strapi and Gatsby
          </h1>
          <p className="lead py-3">
            This project is demo of a little React/Strapi/Gatsby skill by
            @nicolascalev. Basically you can add cars to a dealership on strapi
            and see how many visits to the mechanic it has had along with some
            basic info
          </p>
          <div className="d-flex flex-wrap">
            <a
              className="btn btn-dark"
              href="https://linktr.ee/nicolascalev"
              target="_blank"
              rel="noreferrer"
            >
              Connect with me ↗
            </a>
            <a
              className="btn btn-text ms-0 mt-2 ms-sm-2 mt-sm-0"
              href="https://github.com/nicolascalev/car-dealership"
              target="_blank"
              rel="noreferrer"
            >
              Frontend repo ↗
            </a>
          </div>
        </div>

        <div className="d-none d-md-block col-3"></div>
      </div>

      <div className="row">
        <div className="d-none d-md-block col-3"></div>

        <div className="col-12 col-md-6">
          <div className="pt-3">
            <AppSearchInput></AppSearchInput>
            <AppActiveFilters></AppActiveFilters>
            <AppCarList></AppCarList>
          </div>
        </div>

        <div className="d-none d-md-block col-3"></div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Car dealership by @nicolascalev</title>;
