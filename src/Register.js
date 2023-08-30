import React from "react"
import { useNavigate } from "react-router-dom"


import { useState, useEffect } from "react";

//import ReactDOM from "react-dom/client";

// regex to match numbers between 1 and 10 digits long
const validPassword = /^\d{1,10}$/;

export default function Register() {
  // const https = require('https');

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();


  const handleChange = ({ target }) => {
    let isValid = true;
    const { name, value } = target;
    // if (name ==='submit')
    // {console.log('in handle change')}
    if (name === 'password') {
      isValid = validPassword.test(value);
    }
    if (isValid) {
      setInputs(values => ({ ...values, [name]: value }))
    }

  }


  //submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    const data = JSON.stringify(inputs);
    console.log(data);
    console.log(inputs.username);

    try {
      const response = await fetch(`http://localhost:3001/${inputs.username}/customers`, {
        method: "POST",
        body: data, // Envoyer les données telles quelles (déjà au format JSON)
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Status: ${response.status}`);
      console.log("Response headers:", response.headers);

      //   const resData = await response.json();

      if (response.status === 201) {
        // const user = {
        //   username: resData.username,
        //   password: inputs.password,
        // };

        // console.log("User:", resData);
        alert("Welcome! You were registered successfully.");
        // localStorage.setItem("currentUser", JSON.stringify(user));
        // navigate(`/users/${user.username}`);
        navigate('/login');
      } else if (response.status === 400) {
        alert("Username is already in use");
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };





  return (
    <div className="login-container">
      <h1>WELCOME</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="inputTypeIn"
          id="userNameInput"
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
          placeholder="Enter your username:"
          required
        />
        <input
          id="passwordInput"
          className="inputTypeIn"
          maxLength={4}
          type="password"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
          placeholder="Enter your password:"
          required
        />
        <input
          id="emailInput"
          className="inputTypeIn"
          type="email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          placeholder="Enter your email:"
          required
        />
        <input
          id="firstNameInput"
          className="inputTypeIn"
          type="text"
          name="firstName"
          value={inputs.firstName || ""}
          onChange={handleChange}
          placeholder="Enter your first name:"
          required
        />

        <input
          id="lastNameInput"
          className="inputTypeIn"
          type="text"
          name="lastName"
          value={inputs.lastName || ""}
          onChange={handleChange}
          placeholder="Enter your last name:"
          required
        />
        <input
          id="addressInput"
          className="inputTypeIn"
          type="text"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
          placeholder="Enter your address:"
          required
        />
        <input
          id="phoneInput"
          className="inputTypeIn"
          type="tel"
          name="phone"
          value={inputs.phone || ""}
          onChange={handleChange}
          placeholder="Enter your phone:"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          required
        />
        <label style={{
          backgroundColor: "white", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          borderRadius: "6px 6px 0px 0px", color: "gray"
              }}>Enter your birth date:</label>
        <input
          id="birthDateInput"
          className="inputTypeIn"
          type="date"
          name="birthDate"
          value={inputs.birthDate || ""}
          onChange={handleChange}
          // placeholder="Enter your birth date:"
          required
        />
        <input id="registerButton" type="submit" name="submit" value="REGISTER" />
      </form>
    </div>

  )
}

// //id, name, username, email, address, phone, website, company

//   CREATE TABLE Customers (
//     customer_id INT PRIMARY KEY AUTO_INCREMENT,
//     Username VARCHAR(255),
//     Password VARCHAR(255),
//     Email VARCHAR(255),
//     First_name VARCHAR(255),
//     Last_Name VARCHAR(255),
//     Address VARCHAR(255),
//     Phone_Number VARCHAR(10),
//     birthday_date DATE,
//     Exercising_a_birthday_discount BOOLEAN
// );