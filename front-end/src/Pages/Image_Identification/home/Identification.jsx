import Sidebar from "../../Image_Identification/components/sidebar/Sidebar.jsx";
//import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../Image_Identification/components/widget/Widget.jsx";
import Table from "../../Image_Identification/components/table/IdentificationTable.jsx"


import Navbar from '../components/navbar/Navbar.jsx'

const Identification = () => {
  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <Table />
      </div>


    </div>
  )
}

export default Identification


