import React, { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const List = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  const fetchMonitoringData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/PlantDisease/get-PlantDisease"
      );
      const allMonitoringData = response.data.PDisease;
      setMonitoringData(allMonitoringData);
    } catch (error) {
      console.error("Error fetching monitoring data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = monitoringData.filter((disease) =>
    disease.plant_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headerStyle = {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left'
  };

  return (
    <div>
      <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <SearchOutlinedIcon/>
        </div>
        <h1 style={headerStyle}>Orchid Plant Monitoring</h1>
      </div>
    </div>
      {/* <div className="search">
      <input
        type="text"
        placeholder="Search Plant ID"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </div> */}
      <TableContainer component={Paper}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Plant ID</th>
              <th scope="col">Start Date</th>
              <th scope="col">Start Percentage</th>
              <th scope="col">Current Date</th>
              <th scope="col">Current Percentage</th>
              <th scope="col">Percentage Difference</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((disease) => (
              <tr key={disease.id}>
                <td>{disease.plant_id}</td>
                <td>{disease.Checked_start_date}</td>
                <td>{parseFloat(disease.first_disease_affected_percentage).toFixed(2)}</td>
                <td>{disease.Checked_Current_date}</td>
                <td>{parseFloat(disease.Current_disease_affected_percentage).toFixed(2)}</td>
                <td>{(disease.first_disease_affected_percentage - disease.Current_disease_affected_percentage).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default List;
