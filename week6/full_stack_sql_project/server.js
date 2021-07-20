const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mark',
  database: 'salesorders',
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


db.connect((err) => {
  if (err) {
    throw err;
  }
  app.get("/get", (req, res, next) => {
    let sqlSelect = "SELECT * FROM salesorders.employees;";
    db.query(sqlSelect, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result);
    });
  });
  
  
  app.post("/post", (req, res, next) => {
    let sql = "INSERT INTO salesorders.employees SET ?";
    let post = {
        EmpFirstName: req.body.EmpFirstName,
        EmpLastName: req.body.EmpLastName,
        EmpStreetAddress: req.body.EmpStreetAddress,
        EmpCity: req.body.EmpCity,
        EmpState: req.body.EmpState,
        EmpPhoneNumber: req.body.EmpPhoneNumber,
        EmpZipCode: req.body.EmpZipCode,
        EmpAreaCode: req.body.EmpAreaCode
    };
    db.query(sql, post, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result)
    });
  });
  
  app.delete("/delete/:employeeId", (req, res, next) => {
    let sql = `DELETE FROM salesorders.employees WHERE EmployeeID = '${req.params.employeeId}'`
    db.query(sql, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send("Successfully Removed Employee!")
    });
  });
  
  
  app.put("/edit/:employeeId", (req, res, next) => {
    let updateEmpFirstName = req.body.EmpFirstName;
    let updateEmpLastName = req.body.EmpLastName;
    let updateEmpStreetAddress = req.body.EmpStreetAddress;
    let updateEmpCity = req.body.EmpCity;
    let updateEmpState = req.body.EmpState;
    let updateEmpPhoneNumber = req.body.EmpPhoneNumber;
    let updateEmpZipCode = req.body.EmpZipCode;
    let udpateEmpAreaCode = req.body.EmpAreaCode;
    let sql = `UPDATE salesorders.employees SET 
    EmpFirstName = '${updateEmpFirstName}',
    EmpLastName = '${updateEmpLastName}',
    EmpStreetAddress = '${updateEmpStreetAddress}',
    EmpCity = '${updateEmpCity}',
    EmpState = '${updateEmpState}',
    EmpPhoneNumber = '${updateEmpPhoneNumber}',
    EmpZipCode = '${updateEmpZipCode}',
    EmpAreaCode = '${udpateEmpAreaCode}'
        WHERE EmployeeID = '${req.params.employeeId}'`
    db.query(sql, (err, result) => {
        if(err){
            throw (err);
        }
        console.log(result);
        return res.send(result);
    });
  });
  app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  });
  

  console.log("Database Connection Successful!")
})

app.listen(9000, () => {
  console.log("Running on Port 9000")
})
