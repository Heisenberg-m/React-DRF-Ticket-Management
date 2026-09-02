import React from "react";
import "./Ticketheader.css";

const Ticketheader = () => {
  return (
    <div className="header-container">
      <div className="id">
        <p>Id</p>
      </div>
      <div className="priority">
        <p>Priority</p>
      </div>
      <div className="created-at">
        <p>CreatedAt</p>
      </div>
      <div className="updated-at">
        <p>UpdatedAt</p>
      </div>
      <div className="status">
        <p>Status</p>
      </div>
    </div>
  );
};

export default Ticketheader;
