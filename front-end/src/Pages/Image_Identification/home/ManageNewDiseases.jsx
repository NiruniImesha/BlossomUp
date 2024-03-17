import Sidebar from "../../Image_Identification/components/sidebar/Sidebar.jsx";
//import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Table from "../../Image_Identification/components/table/ManageNewDiseasesTable.jsx";
import ImageListUploaded from "../../researcher/SubmitedImageList.jsx";

const ManageNewDiseases = () => {
  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Table />
        <ImageListUploaded />
      </div>


    </div>
  )
}

export default ManageNewDiseases


