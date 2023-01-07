import * as React from "react";
import { Link } from "gatsby";

function AppCarItem(props) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }).format(props.price);

  return (
    <Link to={`/car/${props.id}`} className="text-decoration-none text-reset">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-4">
            <img
              src={props.photo}
              style={carItemStyles.photo}
              className="img-fluid rounded-start"
              alt={props.label}
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{props.label}</h5>
              <p className="card-text" style={carItemStyles.description}>
                {props.description}
              </p>
              <p className="card-text">
                <small className="text-muted">
                  {price} • {props.year} • {props.owners} owners • {props.brand}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AppCarItem;

var carItemStyles = {
  description: {
    whiteSpace: "nowrap",
    maxHeight: "4rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  photo: {
    height: "100%",
    backgroundPosition: "center",
    objectFit: "cover",
  },
};
