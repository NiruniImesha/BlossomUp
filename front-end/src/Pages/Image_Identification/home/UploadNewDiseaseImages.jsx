import Sidebar from "../../Image_Identification/components/sidebar/Sidebar.jsx";
import "./home.scss";
import Table from "../../Image_Identification/components/table/ManageNewDiseasesTable.jsx";
import UploadImageform from "../../farmer/SubmitImages.jsx";

const UploadNewDiseaseImages = () => {
  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Table />
        <UploadImageform />
      </div>


    </div>
  )
}

export default UploadNewDiseaseImages


