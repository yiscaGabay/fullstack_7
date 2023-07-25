const cors = require('cors');
const express = require('express')
const app = express()

const mysql = require('mysql2');

// app.listen(3001, () => {
//   console.log('Server is running on port 3000');
// });

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ycGB1625',
    database: 'booksShop',
    port: '3306'
});

// SQL script to create the database and tables
const sqlScript = `
CREATE DATABASE booksShop;
USE booksShop;

-- Place the provided SQL script here
-- ...
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255),
    First_name VARCHAR(255),
    Last_Name VARCHAR(255),
    Address VARCHAR(255),
    Phone_Number VARCHAR(10),
    birthday_date DATE,
    Exercising_a_birthday_discount BOOLEAN
);

CREATE TABLE Employees (
    manager_id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255),
    First_name VARCHAR(255),
    Last_Name VARCHAR(255),
    Address_VARCHAR(255),
    Phone_Number VARCHAR(255)
);

CREATE TABLE Products (
    Product_ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Author VARCHAR(255),
    Description TEXT,
    Price DECIMAL(10, 2),
    Category VARCHAR(255),
    Amount INT
);

CREATE TABLE Orders (
    Order_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name_of_the_owner_of_the_order VARCHAR(255),
    shipping_address VARCHAR(255),
    Delivery_city VARCHAR(255),
    Mail VARCHAR(255),
    Telephone VARCHAR(255),
    Credit_details_for_payment VARCHAR(255),
    customer_id INT,
    The_final_order_price DECIMAL(10, 2),
    purchase_date TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Purchase_of_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT,
    product_id INT,
    Amount INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (purchase_id) REFERENCES Orders(Order_ID),
    FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
);

CREATE TABLE Shopping_cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    Amount INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
);

CREATE TABLE Account_page (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
);

CREATE TABLE Usernames_and_passwords (
    Username VARCHAR(255),
    Password VARCHAR(255),
    Allowing_Access BOOLEAN
);

CREATE TABLE Tracking_the_price_of_books_in_the_sale (
    price_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    Price_after_sale DECIMAL(10, 2),
    Time_stamp TIMESTAMP,
    promotion_id INT,
    FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id),
    FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
);

CREATE TABLE Inventory_tracking (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    Amount INT,
    Time_stamp TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
);

CREATE TABLE Promotions (
    promotion_id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Type VARCHAR(255),
    Description TEXT,
    Start_Date DATE,
    end_date DATE
);

CREATE TABLE Notifications (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    message TEXT,
    Time_stamp TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_tracking (
    tracking_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    Status VARCHAR(255),
    Time_stamp TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
);
`;

// Connect to MySQL and execute the SQL script
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL successfully.');

  // Execute the SQL script
  connection.query(sqlScript, (err, results) => {
    if (err) {
      console.error('Error executing SQL script:', err);
    } else {
      console.log('SQL script executed successfully.');
      console.log('Results:', results);
    }

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed successfully.');
      }
    });
  });
});
