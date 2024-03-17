import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loging from './Pages/Image_Identification/home/Loging';
import Identification from './Pages/Image_Identification/home/Identification';
import Monitoring from './Pages/Image_Identification/home/Monitoring';
import AdminHome from './Pages/Image_Identification/home/AdminHome';
import ManageNewDiseases from './Pages/Image_Identification/home/ManageNewDiseases';
import ManageNewDiseasesView from './Pages/Image_Identification/home/ManageNewDiseasesView';
import UploadNewDiseaseImages from './Pages/Image_Identification/home/UploadNewDiseaseImages';
import DiseasePredictionModelManage from './Pages/researcher/DiseasePredictionModelManage';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Loging />} />
      <Route path="/Loging" element={<Loging />} />
      <Route path="/Admin-Dashboard" element={<AdminHome />} />
      <Route path="/Identification-Result" element={<Identification />} />
      <Route path="/Plant-Monitoring-Result" element={<Monitoring />} />
      <Route path="/Manage-New-Diseases" element={<ManageNewDiseases />} />
      <Route path="/Manage-New-Diseases-view/:id" element={<ManageNewDiseasesView />} />
      <Route path="/Upload-New-Disease-Images" element={<UploadNewDiseaseImages />} />
      <Route path="/Disease-Prediction-Model-Manage" element={<DiseasePredictionModelManage />} />

    </Routes>
  );
}

export default App;
