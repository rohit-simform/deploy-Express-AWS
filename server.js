require("dotenv").config()
const express = require("express")
const prisma = require("./db/prisma/config")
const bodyParser = require("body-parser");
const app = express()
const PORT = process.env.PORT || 5500

app.use(bodyParser.json());



app.get("/api/test", (req,res) => {
    res.send("ok")
})

app.get("/api/home", (req,res) => {
    res.send("home")
})

// API to insert student info into the database
app.post("/api/students", async (req, res) => {
    const { name, email, age, college } = req.body;
  
    // Input validation
    if (!name || !email) {
      return res.status(400).json({ error: "Please provide name, age, and college" });
    }
  
    try {
      const findStudent = await prisma.students.findUnique({
        where: {
          email
        }
      })

      if(findStudent){
        return res.json({ status: 400, msg: "Email already is taken."})
      }

      const newStudent = await prisma.students.create({
        data: {
          name,
          email,
          age,
          college
        }
      })

      res.status(201).json({
        message: "Student info added successfully",
        student: newStudent,
      });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // fetch all list of students
  app.get("/api/students", async (req,res) => {
    try {
      // fetch query
      const students = await prisma.students.findMany() 
 
     res.status(200).json({
       message: "Student info fetched successfully",
       student: students,
     });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  // update student
  app.put("/api/students/:id", async (req,res) => {
    const {id} = req.params
    if(!id){
      return res.json({ status: 400, msg: "id is missing.."})
    }

    try {
    const updatedStudent = await prisma.students.update({
      where: {
        id: Number(id)
      },
      data: {...req.body},
    });

    res.status(200).json({
      message: "Update successfully.."
    });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

  })


    // delete student
    app.delete("/api/students/:id", async (req,res) => {
      const {id} = req.params
      if(!id){
        return res.json({ status: 400, msg: "id is missing.."})
      }
  
      try {
        
      const deleteStudent = await prisma.students.delete({
        where: {
          id: Number(id)
        }      });
  
      res.status(200).json({
        message: "Delete successfully.."
      });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
  
    })

app.listen(PORT, () => console.log("Server is running on port ",PORT))