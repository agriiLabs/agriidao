import React from "react";

const TestHome = () => {
  return (
    <div className="container-fluid">
      <div className="layout-specing">
        <h5 className="mb-3">Dashboard Overview</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h6>Visitor Count</h6>
              <p className="text-muted">4,589</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h6>Revenue</h6>
              <p className="text-muted">$35,214</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHome;
