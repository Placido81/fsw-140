import React, { useState } from 'react';
import AddEmployees from './AddEmployees';
import './employees.css';

function Employees(props){

    const { EmployeeID, EmpFirstName, EmpLastName, EmpStreetAddress, EmpCity, EmpState, EmpPhoneNumber,  EmpZipCode, EmpAreaCode} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div>
        <h1 className="badge-title">ID Badge:</h1>
        </div>
        <div className="container">
        { !editToggle ?
        <div> 
            <p className="badge-text"> Employee ID: { EmployeeID }</p>
            <p className="badge-text"> Full Name: { EmpFirstName } { EmpLastName }</p>
            <p className="badge-text"> Address: { EmpStreetAddress } { EmpCity } { EmpState } {EmpZipCode}</p>
            <p className="badge-text"> Phone Number: {EmpAreaCode} { EmpPhoneNumber }</p>
            


           
            <div>
            <button
                className="delete-btn"
                onClick={() => props.deleteEmployee(EmployeeID)}>
                Delete
            </button>
            <button
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </div>
        :
        <div>
            <AddEmployees
                EmployeeID={EmployeeID}
                EmpFirstName={EmpFirstName}
                EmpLastName={EmpLastName}
                EmpStreetAddress={EmpStreetAddress}
                EmpCity={EmpCity}
                EmpState={EmpState}
                EmpPhoneNumber={EmpPhoneNumber}
                EmpZipCode={EmpZipCode}
                EmpAreaCode={EmpAreaCode}
                btnText="Submit Edit" 
                submit={props.editEmployee}
            />
            <button
                className="delete-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </div>
        }
        </div>
        </div>
    )
}
export default Employees;
