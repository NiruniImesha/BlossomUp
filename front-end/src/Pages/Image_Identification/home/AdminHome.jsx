import Sidebar from "../components/sidebar/Sidebar.jsx";
// import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget.jsx";
import Form from "../components/form/AdminHomeForm.jsx"


import Navbar from '../components/navbar/Navbar.jsx'

const AdminHome = () => {
  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <Form />
      </div>


    </div>
  )
}

export default AdminHome


