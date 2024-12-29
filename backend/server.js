const express = require("express");
const app = express();

require('dotenv').config(); 
require("./conn/conn");
const cors = require("cors");
const UserApi = require("./routes/user");
const LoanApi= require("./routes/loan")
app.use(cors());
app.use(express.json());


app.use("/api/v1", UserApi);
app.use("/api/v2", LoanApi);

app.get("/", (req, res) => {
    res.send("hello from backend side");
});


const PORT = 1000;
app.listen(PORT, () => {
    console.log("server started on port", PORT);
});