import React from "react";

function AppLoader() {
  return (
    <div className="d-flex align-items-center">
      <strong>Loading...</strong>
      <div
        className="spinner-border spinner-border-sm ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
}

export default AppLoader;
