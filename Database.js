const mysql = require('mysql2');

// app.listen(3001, () => {
//   console.log('Server is running on port 3000');
// });

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mySql123',
  database: 'booksShop',
  port: '3306',
});

const insertQuery = `
    INSERT INTO products (Title, Author, Description, Price, Category, Amount)
    VALUES
    ('Enigma of Shadows', 'Jane Smith', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 72.50, 'Adults', 34),
('Baking Delights', 'Emily Johnson', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 42.25, 'Cooking and Baking', 21),
('Galactic Adventures', 'Mark Roberts', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 55.80, 'Comics', 50),
('The Little Explorer', 'Sarah Thompson', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 34.90, 'Children', 17),
('Midnight Secrets', 'Michael Davis', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 91.20, 'Adults', 48),
('Sweets Galore', 'Amy White', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 38.70, 'Cooking and Baking', 26),
('Laugh Out Loud', 'Amanda Brown', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 47.60, 'Comics', 40),
('Adventures in Space', 'James Anderson', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 66.25, 'Children', 63),
('Hidden Truths', 'Laura Lee', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 81.40, 'Adults', 56),
('Gourmet Delicacies', 'Daniel Baker', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 59.90, 'Cooking and Baking', 30),
('Humorous Escapades', 'Rachel Green', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 45.15, 'Comics', 45),
('Jungle Explorers', 'Kevin Adams', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 38.80, 'Children', 23),
('Time-Traveling Heroes', 'Michael Turner', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 41.40, 'Comics', 36),
('Nature Wonders', 'Anna Green', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 65.70, 'Children', 47),
('Echoes of Eternity', 'Emily Roberts', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 97.30, 'Adults', 68),
('Breads of the World', 'Carlos Martinez', 'https://th.bing.com/th/id/OIP.SVjnnVSyQWNkUYQGyZkPwgHaGO?pid=ImgDet&rs=1', 43.80, 'Cooking and Baking', 22)`;

//Connect to MySQL and execute the SQL script
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL successfully.');

  connection.query(insertQuery, (err, results) => {
    if (err) {
      console.error('Error executing INSERT statements:', err);
      connection.end();
      return;
    }

    console.log('INSERT statements executed successfully');
    connection.end();



    //SQL script to create the database and tables

    // const sqlScript = `
    // CREATE DATABASE booksShop;

    //   USE booksShop;

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


    //   CREATE TABLE Employees (
    //       manager_id INT PRIMARY KEY AUTO_INCREMENT,
    //       Username VARCHAR(255),
    //       Password VARCHAR(255),
    //       Email VARCHAR(255),
    //       First_name VARCHAR(255),
    //       Last_Name VARCHAR(255),
    //       Address_VARCHAR(255),
    //       Phone_Number VARCHAR(255)
    //   );

    //   CREATE TABLE Products (
    //       Product_ID INT PRIMARY KEY AUTO_INCREMENT,
    //       Title VARCHAR(255),
    //       Author VARCHAR(255),
    //       Description TEXT,
    //       Price DECIMAL(10, 2),
    //       Category VARCHAR(255),
    //       Amount INT
    //   );

    //   CREATE TABLE Orders (
    //       Order_ID INT PRIMARY KEY AUTO_INCREMENT,
    //       Name_of_the_owner_of_the_order VARCHAR(255),
    //       shipping_address VARCHAR(255),
    //       Delivery_city VARCHAR(255),
    //       Mail VARCHAR(255),
    //       Telephone VARCHAR(255),
    //       Credit_details_for_payment VARCHAR(255),
    //       customer_id INT,
    //       The_final_order_price DECIMAL(10, 2),
    //       purchase_date TIMESTAMP,
    //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    //   );

    //   CREATE TABLE Purchase_of_items (
    //       item_id INT PRIMARY KEY AUTO_INCREMENT,
    //       purchase_id INT,
    //       product_id INT,
    //       Amount INT,
    //       Price DECIMAL(10, 2),
    //       FOREIGN KEY (purchase_id) REFERENCES Orders(Order_ID),
    //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
    //   );

    //   CREATE TABLE Shopping_cart (
    //       cart_id INT PRIMARY KEY AUTO_INCREMENT,
    //       customer_id INT,
    //       product_id INT,
    //       Amount INT,
    //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
    //   );

    //   CREATE TABLE Account_page (
    //       account_id INT PRIMARY KEY AUTO_INCREMENT,
    //       customer_id INT,
    //       order_id INT,
    //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    //       FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
    //   );

    //   CREATE TABLE Usernames_and_passwords (
    //       Username VARCHAR(255),
    //       Password VARCHAR(255),
    //       Allowing_Access BOOLEAN
    //   );

    //   CREATE TABLE Tracking_the_price_of_books_in_the_sale (
    //       price_id INT PRIMARY KEY AUTO_INCREMENT,
    //       product_id INT,
    //       Price_after_sale DECIMAL(10, 2),
    //       Time_stamp TIMESTAMP,
    //       promotion_id INT,
    //       FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id),
    //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
    //   );

    //   CREATE TABLE Inventory_tracking (
    //       inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    //       product_id INT,
    //       Amount INT,
    //       Time_stamp TIMESTAMP,
    //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
    //   );

    //   CREATE TABLE Promotions (
    //       promotion_id INT PRIMARY KEY AUTO_INCREMENT,
    //       Title VARCHAR(255),
    //       Type VARCHAR(255),
    //       Description TEXT,
    //       Start_Date DATE,
    //       end_date DATE
    //   );

    //   CREATE TABLE Notifications (
    //       alert_id INT PRIMARY KEY AUTO_INCREMENT,
    //       customer_id INT,
    //       message TEXT,
    //       Time_stamp TIMESTAMP,
    //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    //   );

    //   CREATE TABLE Order_tracking (
    //       tracking_id INT PRIMARY KEY AUTO_INCREMENT,
    //       order_id INT,
    //       Status VARCHAR(255),
    //       Time_stamp TIMESTAMP,
    //       FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
    //   );
    //   `;



    // const insertData = {
    //   Username: 'example_user',
    //   Password: 'example_password',
    //   Allowing_Access: true
    // };

    // const insertQuery = 'INSERT INTO Usernames_and_passwords (Username, Password, Allowing_Access) VALUES (?, ?, ?)';

    // connection.query(insertQuery, [insertData.Username, insertData.Password, insertData.Allowing_Access], (err, results) => {
    //   if (err) {
    //     console.error('Error inserting data:', err);
    //   } else {
    //     console.log('Data inserted successfully.');
    //     console.log('Inserted row ID:', results.insertId);
    //   }
    //   connection.end();
    // });



    //   // Execute the SQL script
    //   connection.query(sqlScript, (err, results) => {
    //     if (err) {
    //       console.error('Error executing SQL script:', err);
    //     } else {
    //       console.log('SQL script executed successfully.');
    //       console.log('Results:', results);
    //     }

    //     // Execute each statement separately
    //     sqlStatements.forEach((sqlStatement) => {
    //       connection.query(sqlStatement, (error, results) => {
    //         if (error) {
    //           console.error('Error executing SQL statement:', error);
    //         } else {
    //           console.log('SQL statement executed successfully.');
    //         }
    //       });
    //     });

    //     // Close the connection
    //     connection.end((err) => {
    //       if (err) {
    //         console.error('Error closing connection:', err);
    //       } else {
    //         console.log('Connection closed successfully.');
    //       }
    //     });
  });
});



// const mysql = require('mysql2');
// const express = require('express')
// const app = express()
// const cors = require('cors');

// app.listen(3001, () => {
//   console.log('Server is running on port 3000');
// });

// //MySQL database connection configuration
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'mySql123',
//   database: 'booksShop',
//   port: '3306',
// });

// //SQL script to create the database and tables
// //CREATE DATABASE booksShop;

// const sqlScript = 
// `CREATE TABLE Tracking_the_price_of_books_in_the_sale (
//   price_id INT PRIMARY KEY AUTO_INCREMENT,
//   product_id INT,
//   Price_after_sale DECIMAL(10, 2),
//   Time_stamp TIMESTAMP,
//   promotion_id INT,
//   FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id),
//   FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
// );`;

// // const sqlScript = `


// //   USE booksShop;

// //   CREATE TABLE Customers (
// //     customer_id INT PRIMARY KEY AUTO_INCREMENT,
// //     Username VARCHAR(255),
// //     Password VARCHAR(255),
// //     Email VARCHAR(255),
// //     First_name VARCHAR(255),
// //     Last_Name VARCHAR(255),
// //     Address VARCHAR(255),
// //     Phone_Number VARCHAR(10),
// //     birthday_date DATE,
// //     Exercising_a_birthday_discount BOOLEAN
// // );


// //   CREATE TABLE Employees (
// //       manager_id INT PRIMARY KEY AUTO_INCREMENT,
// //       Username VARCHAR(255),
// //       Password VARCHAR(255),
// //       Email VARCHAR(255),
// //       First_name VARCHAR(255),
// //       Last_Name VARCHAR(255),
// //       Address VARCHAR(255),
// //       Phone_Number VARCHAR(255)
// //   );

// //   CREATE TABLE Products (
// //       Product_ID INT PRIMARY KEY AUTO_INCREMENT,
// //       Title VARCHAR(255),
// //       Author VARCHAR(255),
// //       Description TEXT,
// //       Price DECIMAL(10, 2),
// //       Category VARCHAR(255),
// //       Amount INT
// //   );

// //   CREATE TABLE Orders (
// //       Order_ID INT PRIMARY KEY AUTO_INCREMENT,
// //       Name_of_the_owner_of_the_order VARCHAR(255),
// //       shipping_address VARCHAR(255),
// //       Delivery_city VARCHAR(255),
// //       Mail VARCHAR(255),
// //       Telephone VARCHAR(255),
// //       Credit_details_for_payment VARCHAR(255),
// //       customer_id INT,
// //       The_final_order_price DECIMAL(10, 2),
// //       purchase_date TIMESTAMP,
// //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
// //   );

// //   CREATE TABLE Purchase_of_items (
// //       item_id INT PRIMARY KEY AUTO_INCREMENT,
// //       purchase_id INT,
// //       product_id INT,
// //       Amount INT,
// //       Price DECIMAL(10, 2),
// //       FOREIGN KEY (purchase_id) REFERENCES Orders(Order_ID),
// //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
// //   );

// //   CREATE TABLE Shopping_cart (
// //       cart_id INT PRIMARY KEY AUTO_INCREMENT,
// //       customer_id INT,
// //       product_id INT,
// //       Amount INT,
// //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
// //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
// //   );

// //   CREATE TABLE Account_page (
// //       account_id INT PRIMARY KEY AUTO_INCREMENT,
// //       customer_id INT,
// //       order_id INT,
// //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
// //       FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
// //   );

// //   CREATE TABLE Usernames_and_passwords (
// //       Username VARCHAR(255),
// //       Password VARCHAR(255),
// //       Allowing_Access BOOLEAN
// //   );

// //   CREATE TABLE Tracking_the_price_of_books_in_the_sale (
// //       price_id INT PRIMARY KEY AUTO_INCREMENT,
// //       product_id INT,
// //       Price_after_sale DECIMAL(10, 2),
// //       Time_stamp TIMESTAMP,
// //       promotion_id INT,
// //       FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id),
// //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
// //   );

// //   CREATE TABLE Inventory_tracking (
// //       inventory_id INT PRIMARY KEY AUTO_INCREMENT,
// //       product_id INT,
// //       Amount INT,
// //       Time_stamp TIMESTAMP,
// //       FOREIGN KEY (product_id) REFERENCES Products(Product_ID)
// //   );

// //   CREATE TABLE Promotions (
// //       promotion_id INT PRIMARY KEY AUTO_INCREMENT,
// //       Title VARCHAR(255),
// //       Type VARCHAR(255),
// //       Description TEXT,
// //       Start_Date DATE,
// //       end_date DATE
// //   );

// //   CREATE TABLE Notifications (
// //       alert_id INT PRIMARY KEY AUTO_INCREMENT,
// //       customer_id INT,
// //       message TEXT,
// //       Time_stamp TIMESTAMP,
// //       FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
// //   );

// //   CREATE TABLE Order_tracking (
// //       tracking_id INT PRIMARY KEY AUTO_INCREMENT,
// //       order_id INT,
// //       Status VARCHAR(255),
// //       Time_stamp TIMESTAMP,
// //       FOREIGN KEY (order_id) REFERENCES Orders(Order_ID)
// //   );
// //   `;



// // const insertData = {
// //   Username: 'example_user',
// //   Password: 'example_password',
// //   Allowing_Access: true
// // };

// // const insertQuery = 'INSERT INTO Usernames_and_passwords (Username, Password, Allowing_Access) VALUES (?, ?, ?)';

// // connection.query(insertQuery, [insertData.Username, insertData.Password, insertData.Allowing_Access], (err, results) => {
// //   if (err) {
// //     console.error('Error inserting data:', err);
// //   } else {
// //     console.log('Data inserted successfully.');
// //     console.log('Inserted row ID:', results.insertId);
// //   }
// //   connection.end();
// // });

// //Connect to MySQL and execute the SQL script
// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to MySQL:', err);
// //     return;
// //   }

//   console.log('Connected to MySQL successfully.');

//   const queries = sqlScript.split(';');

// connection.connect((err) => {
//   if (err) throw err;
  
//   for (const query of queries) {
//     if (query.trim() !== '') {
//       connection.query(query, (error, results) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.log('Query executed successfully.');
//         }
//       });
//     }
//   }
  
//   connection.end();
// });








//   // Execute the SQL script
//   // connection.query(sqlScript, (err, results) => {
//   //   if (err) {
//   //     console.error('Error executing SQL script:', err);
//   //   } else {
//   //     console.log('SQL script executed successfully.');
//   //     console.log('Results:', results);
//   //   }

//     // Execute each statement separately
//     // sqlStatements.forEach((sqlStatement) => {
//     //   connection.query(sqlStatement, (error, results) => {
//     //     if (error) {
//     //       console.error('Error executing SQL statement:', error);
//     //     } else {
//     //       console.log('SQL statement executed successfully.');
//     //     }
//     //   });
//     // });

//     // Close the connection
// //     connection.end((err) => {
// //       if (err) {
// //         console.error('Error closing connection:', err);
// //       } else {
// //         console.log('Connection closed successfully.');
// //       }
// //     });
// //   });
// // });
