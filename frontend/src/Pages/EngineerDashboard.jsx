import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Filterbar from "../Components/Filterbar/Filterbar";
import Ticketheader from "../Components/Ticketheader/Ticketheader";
import Ticketcard from "../Components/Ticketcard/Ticketcard";

const EngineerDashboard = () => {
  const [searchId, setSearchId] = useState("");
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const [assignedActive, setAssignedActive] = useState(false);

  return (
    <div>
      <Navbar onSearchChange={setSearchId} />
      <Filterbar
        onApplyFilter={setFilters}
        assignedActive={assignedActive}
        onToggleAssigned={() => setAssignedActive((prev) => !prev)}
      />
      <Ticketheader />
      <Ticketcard
        searchId={searchId}
        filters={filters}
        assignedActive={assignedActive}
      />
    </div>
  );
};

export default EngineerDashboard;
