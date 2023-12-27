import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/common/Login";
import Signup from "./component/common/Signup";
import FdashBoard from "./component/floriculturist/FloriculturistDashboard";
import FimageUpload from "./component/floriculturist/FloriculturistImageUpload";
import Rdashboard from "./component/researcher/ResearcherDashboard";
import RimageList from "./component/researcher/ResearcherImagesList";
import RimageAppprove from "./component/researcher/ResearcherApproveImage";

import Auth from "./component/check/Auth";
// import Movie from "./component/common/Movie";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* This is related to the Floriculturist */}
          <Route path="/floriculturist-dashboard" element={<FdashBoard />} />
          <Route path="/floriculturist-image-upload" element={<FimageUpload />} />

          
          {/* This is related to the Researcher */}
          <Route path="/researcher-dashboard" element={<Rdashboard />} />
          <Route path="/researcher-images-list" element={<RimageList />} />
          {/* <Route path="/researcher-image-approve" element={<RimageAppprove />} />
          <Route path="/researcher-image-approve/:id"  element={<RimageAppprove />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
