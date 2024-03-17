import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";


const Widget = ({type}) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "vehicle":
          data = {
            title: "VEHICLE",
            isMoney: false,
            link: "See all users",
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
        case "equipment":
          data = {
            title: "EQUIPMENT",
            isMoney: false,
            link: "View all orders",
            icon: (
              <ShoppingCartOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          break;
        case "driver":
          data = {
            title: "DRIVER",
            isMoney: true,
            link: "View net earnings",
            icon: (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
              />
            ),
          };
          break;
        case "route":
          data = {
            title: "ROUTE",
            isMoney: true,
            link: "See details",
            icon: (
              <AccountBalanceWalletOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            ),
          };
          break;
        default:
          break;
      }
  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"}{amount}</span>   
            <span className="link">{data.link}</span>
        </div> 
        <div className="right">
            <div className="percentage positive ">
                <KeyboardArrowUpIcon/>
                20%
            </div>
            <PersonOutlinedIcon className="icon"/>
        </div>    
    </div>
  )
}

export default Widget