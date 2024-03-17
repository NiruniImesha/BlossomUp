const cors = require("cors");
const express = require('express');
const bodyparser = require('body-parser')
const { success, error } = require("consola");
const { connect } = require('mongoose')

const { DB, PORT } = require('./config')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

//app.use("/api/employee-manage", require("./routes/employee-manage"))
app.use("/api/DiseaseIdentification", require("./routes/Disease-Identification-manage"))
app.use("/api/OrchidLeaves", require("./routes/OrchidLeaves-manage"))
app.use("/api/OrchidDisease", require("./routes/OrchidDisease-manage"))
app.use("/api/PlantDisease", require("./routes/PlantDisease-manage"))
app.use("/api/User", require("./routes/User-manage"))
// app.use("/api/auth" , require("./routes/auth"))


const startApp = async () => {
    try {
        await connect(DB);
        success({
            message: `Successfully connected with the Database ${DB}`,
            badge: true
        })

        app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}`, badge: true }))
    } catch (err) {

        error({
            message: `Unable to connect with the Database ${DB}`,
            badge: true
        })
        startApp();
    }


}

startApp();