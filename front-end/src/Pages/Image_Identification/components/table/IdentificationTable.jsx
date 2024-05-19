import "./table.scss";
//import "./ManagerAdmin.css"
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState, } from "react";
import axios from 'axios';
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Swal = require('sweetalert2');

const List = () => {
  const [diseaseidentifications, setDiseaseIdentification] = useState([]);
  const [OrchidDisease, setOrchidDisease] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getDiseaseIdentificationData = () => {
    axios.get(`http://localhost:3001/api/DiseaseIdentification/get-Disease-Identification`)
      .then(res => {
        const allDiseaseIdentificationData = res.data.DiseaseI;
        //console.log(DiseaseIdentification)
        setDiseaseIdentification(allDiseaseIdentificationData);
      })
    }
  const getOrchidDiseaseData = () => {
    axios.get(`http://localhost:3001/api/OrchidDisease/get-OrchidDisease`)
      .then(res => {
        const allOrchidDiseaseData = res.data.OrchidD;
        //console.log(DiseaseIdentification)
        setOrchidDisease(allOrchidDiseaseData);
      })
    }

  useEffect(() => {
    getDiseaseIdentificationData();
    getOrchidDiseaseData();
  }, []);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  // Filter the diseaseidentifications based on the search query
  const filteredDiseaseIdentifications = diseaseidentifications.filter((diseasei) => {
    const searchFields = ['identification_date', 'plant_id', 'selected_disease', 'PredictedClass'];
    return searchFields.some(field =>
      diseasei[field].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
              onChange={handleSearchQueryChange} 
            />
            <SearchOutlinedIcon/>
          </div>
          <h1 style={headerStyle}>Orchid Plant Identification</h1>
        </div>
      </div>
      <TableContainer component={Paper} className="table">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Plant ID</th>
              <th scope="col">Selection</th>
              <th scope="col">Disease Name</th>
              <th scope="col">Medicine 01</th>
              <th scope="col">Medicine 02</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredDiseaseIdentifications.map((diseasei) => {
                return (
                  <tr key={diseasei.id}>
                    <td>{diseasei.identification_date}</td>
                    <td>{diseasei.plant_id}</td>
                    <td>{diseasei.selected_disease}</td>
                    <td>{diseasei.PredictedClass}</td>
                    <td>{diseasei.disease_Name.Medicine_01}</td>
                    <td>{diseasei.disease_Name.Medicine_02}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default List;