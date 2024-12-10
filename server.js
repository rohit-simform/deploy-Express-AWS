require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500
app.get("/api/test", (req,res) => {
    res.send("ok")
})

app.get("/api/home", (req,res) => {
    res.send("home")
})

app.listen(PORT, () => console.log("Server is running on port ",PORT))