import React, { useState } from "react";
import { Paper, Typography, Box, Tabs, Tab } from "@mui/material";
import "./Manager.css";
import ManagerUserRoles from "./ManagerUserRoles";
import ManageForums from "./ManageForums";
import ManageResearches from "./ManageResearches";

function Manager() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const getTabContent = (value) => {
    switch (value) {
      case 0:
        return <ManagerUserRoles />;
      case 1:
        return <ManageForums />;
      case 2:
        return <ManageResearches />;
      default:
        return <ManagerUserRoles />;
    }
  };

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        className="manager-dashboard"
        align="center"
        gutterBottom
      >
        Manager Dashboard
      </Typography>

      {/* <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}></Paper> */}
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, gap: 10 }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Manage Users" />
          <Tab label="Manage Forums" />
          <Tab label="Manage Researches" />
        </Tabs>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }} className="manager-dashboard-content">
        {getTabContent(tab)}
      </Paper>
    </>
  );
}

export default Manager;
