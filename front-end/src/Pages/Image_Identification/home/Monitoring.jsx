import Sidebar from "../components/sidebar/Sidebar.jsx";
//import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget.jsx";
import Table from "../components/table/MonitoringTable.jsx"


import Navbar from '../components/navbar/Navbar.jsx'

const Monitoring = () => {
  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        
        <Table />
      </div>


    </div>
  )
}

export default Monitoring


