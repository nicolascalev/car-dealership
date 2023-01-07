import * as React from "react";

function AppMessage(props) {
  return (
    <div className="card text-center mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}

export default AppMessage;
