import "./table.scss";
//import "./ManagerAdmin.css"
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState, } from "react";
import axios from 'axios';

//import plantImage from "../../../../images/1710018812166-03.jpeg"
//import plantImage from "E:/final_project/web/BlossomUp_web_system/BlossomUp_web_system/front-end/src/images/1709841916489-02.jpg"
const Swal = require('sweetalert2');

const List = () => {
  const [diseaseidentifications, setDiseaseIdentification] = useState([]);
  const [OrchidDisease, setOrchidDisease] = useState([]);

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

  return (
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
            {/* <th scope="col">Image</th>            */}
          </tr>
        </thead>
        <tbody>
          {
            diseaseidentifications.map((diseasei) => {
              // const imagePath = diseasei.image_path;
              // const filename = imagePath.split('\\').pop().split('/').pop();
              // const image_path = '../../../../images/'+filename
              return (
                <tr key={diseasei.id}>
                  <td>{diseasei.identification_date}</td>
                  <td>{diseasei.plant_id}</td>
                  <td>{diseasei.selected_disease}</td>
                  <td>{diseasei.PredictedClass}</td>
                  <td>{diseasei.disease_Name.Medicine_01}</td>
                  <td>{diseasei.disease_Name.Medicine_02}</td>
                  {/* <td>{image_path}</td> */}
                  {/* <td><img src={image_path} alt="Plant Image" style={{ maxWidth: '50px' }} /></td> */}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </TableContainer>
  );
};

export default List;