import React from "react";
import { Link } from "gatsby";
import useSWR from "swr";
import AppLoader from "../../../components/AppLoader";
import AppMessage from "../../../components/AppMessage";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SingleCar(props) {
  let apiUrl =
    process.env.GATSBY_API_URL +
    `/api/cars/${props.params.id}?populate[0]=photo&populate[1]=visits&populate[2]=visits.mechanic`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);
  const car = data?.data?.attributes;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }).format(car?.price || 0);

  const photo =
    process.env.GATSBY_API_URL + (car?.photo?.data?.attributes?.url || "");

  if (isLoading) {
    return (
      <div className="container py-5">
        <Link to="/" className="btn btn-light mb-3">
          Home
        </Link>
        <AppLoader></AppLoader>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container py-5">
        <Link to="/" className="btn btn-light mb-3">
          Home
        </Link>
        <AppMessage
          title="Not Found"
          description={`We could not find a car with the id of ${props.params.id}`}
        ></AppMessage>
      </div>
    );
  }

  return (
    <>
      <main className="pb-5 container-fluid">
        <div className="row py-2 py-md-5">
          <div className="d-none d-md-block col-3"></div>

          <div className="col-12 col-md-6">
            <div>
              <Link to="/" className="btn btn-light">
                Home
              </Link>
              <img
                src={photo}
                alt={car.label}
                style={{ width: "100%" }}
                className="d-md-none rounded my-3"
              />
              <div className="row">
                <div className="col-12 col-md-10">
                  <h1 className="display-5">{car.label}</h1>
                  <p className="h5 text-primary">
                    {price} • {car.year} • {car.brand} • {car.owners} owners
                  </p>
                </div>
                <div className="d-none d-lg-block col-2">
                  <img
                    src={photo}
                    alt={car.label}
                    style={photoStyles}
                    className="rounded"
                  />
                </div>
              </div>
              <p className="lead py-3" style={{ whiteSpace: "pre-line" }}>
                {car.description}
              </p>
            </div>
            <hr />
            <p>Visits to the mechanic</p>
            <div className="row">
              {car.visits.data.map((visit) => (
                <div className="col-12 col-sm-6 col-lg-4 mb-2">
                  <div className="card">
                    <div className="card-body">
                      <p>
                        {`${visit.attributes.title} by ${visit.attributes.mechanic.data.attributes.name}`}
                      </p>
                      <p className="text-muted">
                        {new Date(visit.attributes.date).toLocaleDateString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p
                        className={
                          visit.attributes.purpose === "maintenance"
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        • {visit.attributes.purpose}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {car.visits.data.length === 0 && (
                <div className="col-12 col-sm-6 col-lg-4 mb-2">
                  <div className="card">
                    <div className="card-body">
                      <p>No visits</p>
                      <p className="text-muted">No visits have been recorded for this car</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-none d-md-block col-3"></div>
        </div>
      </main>
    </>
  );
}

export const Head = (props) => <title>Car dealership {props.params.id}</title>;

var photoStyles = {
  height: "100px",
  width: "100px",
  backgroundPosition: "center",
  objectFit: "cover",
};
