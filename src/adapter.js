const https = require('https');
const mysql = require('mysql2');
const express = require('express')
const app = express()
const cors = require('cors');
const { json } = require('react-router-dom');



const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mySql123',
  database: 'booksShop',
};

const connection = mysql.createConnection(dbConfig);

connection.connect(function (err) {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());


//register of customers
app.post('/:username/customers', (req, res) => {
  const user = req.body;
  console.log("user register");
  console.log(user.username);
  console.log(user.username);

  connection.query('SELECT * FROM Usernames_and_passwords WHERE Username = ?', [user.username], (err, rows) => {
    if (err) {
      console.error('Error while executing the query: cc ', err);
      res.status(500).send('Error checking username');
    } else {
      if (rows.length > 0) {
        console.log("vghjk");
        res.status(400).send('Username is already in use');
      } else {
        // Insérer les informations dans la table users_password
        const userData = {
          Username: user.username,
          Password: user.password,
          Allowing_Access: 0
        };

        console.log("aa");
        connection.query('INSERT INTO Usernames_and_passwords SET ?', [userData], (err, result) => {
          if (err) {
            console.error('Error while executing the query: line 56 ', err);
            res.status(500).send('Error checking username');
          } else {

            const newUser = {
              Username: user.username,
              Password: user.password,
              Email: user.email,
              First_Name: user.firstName,
              Last_Name: user.lastName,
              Address: user.address,
              Phone_Number: user.phone,
              Birthday_date: user.birthDate,
              Exercising_a_birthday_discount: 0
            };
            connection.query('INSERT INTO Customers SET ?', [newUser], (err, result) => {
              if (err) {
                console.error('Error while executing the query: hhhh', err);
                res.status(500).send('Error checking username');
              } else {
                const userId = result.insertId;
                res.status(201).send(`User added with ID : ${userId}`);
              }
            });
          }
        });
      }
    }
  });
});

//show posts
app.get('/products/:type', (req, res) => {
  const type = req.params.type;

  connection.query('SELECT * FROM Products WHERE Category = ?', [type], (err, rows) => {
    if (err) {
      console.error('Error while executing the query: ', err);
      res.status(500).send('Error finding the books');
    } else {
      if (rows.length === 0) {
        res.status(404).send('books not found');
      } else {
        res.json(rows);
      }
    }
    // connection.end();
  });
});

// app.put('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   const updatedUser = req.body; // Récupérer les données mises à jour de l'utilisateur depuis la requête

//   connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
//     if (err) {
//       console.error('Error while executing the query: ', err);
//       res.status(500).send('Error updating user');
//     } else {
//       res.send('Utilisateur mis à jour avec succès');
//     }
//   });
// });

// //delete all tables
// app.delete('/:table/:id', (req, res) => {
//   const Id = req.params.id;
//   const table=req.params.table;
//   connection.query('DELETE FROM ?? WHERE id = ?', [table,Id], (err, result) => {
//     if (err) {
//       console.error('Error while executing the query: ', err);
//       res.status(500).send(`Error deleting ${table} `);
//     } else {
//       res.send(`${table} deleted successfully`);
//     }
//   });
// });

// //show posts
// app.get('/:userid/posts', (req, res) => {
//   const userId = req.params.userid;

//   connection.query('SELECT * FROM posts WHERE userId = ?', [userId], (err, rows) => {
//     if (err) {
//       console.error('Erreur lors de l\'exécution de la requête :', err);
//       res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
//     } else {
//       if (rows.length === 0) {
//         res.status(404).send('posts not found');
//       } else {
//         const posts = rows.map(post => ({
//           id: post.id,
//           title: post.title,
//           body: post.body,
//         }));
//         res.json(posts);
//       }
//     }
//     // connection.end();
//   });
// });

// //add post
// app.post('/:userId/posts', (req, res) => {
//   const userId = req.params.userId;
//   const post = req.body;

//   const postToAdd = {
//     title: post.title,
//     body: post.body,
//     userId: userId
//   };

//   connection.query('INSERT INTO posts SET ?', [postToAdd], (err, result) => {
//     if (err) {
//       console.error('Error while executing the query: ', err);
//       res.status(500).send('Error adding the post');
//     } else {
//       const postId = result.insertId;
//       const addedPost = {
//         id: postId,
//         title: post.title,
//         body: post.body,
//         userId: userId
//       };
//       res.status(201).json(addedPost);
//     }
//   });
// });

//have the users and passwords
app.get('/users_password', (req, res) => {
  const userName = req.query.username;
  const password = req.query.password;
  console.log("username in login ", userName);
  console.log("password in login ", password);

  connection.query('SELECT * FROM Usernames_and_passwords WHERE Username = ? AND Password = ?', [userName, password], (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving user information');
    } else {
      if (rows.length === 0) {
        res.status(404).send('User not found');
      } else {
        // get the information of the current user

        console.log("I am hear!!");
        // look for the user in customers
        connection.query('SELECT * FROM Customers WHERE Username = ?', [userName], (err, rows) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving user information');
          } else {
            if (rows.length === 0) {
              // look for the user in Employees
              connection.query('SELECT * FROM Employees WHERE Username = ?', [userName], (err, rows) => {
                if (err) {
                  console.error('Error executing query:', err);
                  res.status(500).send('Error retrieving user information');
                } else {
                  if (rows.length === 0) {
                    res.status(404).send('User not found');
                  } else {
                    console.log("224");
                    const userInfo = rows[0]; // First row of results
                    console.log(userInfo);
                    res.json(userInfo); // Sending user information in JSON format
                  }
                }
              });
            } else {
              console.log("232");
              const userInfo = rows[0]; // First row of results
              console.log(userInfo);
              res.json(userInfo); // Sending user information in JSON format
            }
          }
        });
      }
    }
  });
});

// connection.query('SELECT users.*, users_password.* FROM users INNER JOIN users_password ON users.username = ? AND users_password.password = ?', [  userName, password], (err, rows) => {
//   if (err) {
//     console.error('Erreur lors de l\'exécution de la requête :', err);
//     res.status(500).send('Erreur lors de la récupération des informations de l\'utilisateur');
//   } else {
//     if (rows.length === 0) {
//       res.status(404).send('User not found');
//     } else {
//       const user = rows[0];
//       const userInfo = {
//         id: user.id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         website: user.website,
//         company: user.company
//       };
//       console.log(userInfo);
//       res.json(userInfo);
//     }
//   }
// });
// });


// //show the todos
// app.get('/:userId/todos', (req, res) => {
//   const userId = req.params.userId;

//   connection.query('SELECT * FROM todos WHERE userId = ?', [userId], (err, rows) => {
//     if (err) {
//       console.error('Erreur lors de l\'exécution de la requête :', err);
//       res.status(500).send('Erreur lors de la récupération des todos');
//     } else {
//       if (rows.length === 0) {
//         res.status(404).send('Aucun todos trouvé');
//       } else {
//         const todos = rows.map(todo => ({
//           id: todo.id,
//           title: todo.title,
//           completed: todo.completed
//         }));
//         res.json(todos);
//       }
//     }
//     // connection.end();
//   });
// });

// //update todos completed
// app.put('/todos/:Id', (req, res) => {
//   const Id = req.params.Id;
//   const { completed } = req.body;
//   console.log("completed",completed);
//   connection.query(
//     'UPDATE todos SET completed = ? WHERE id = ?',
//     [completed, Id],
//     (err, result) => {
//       if (err) {
//         console.error('Erreur lors de la mise à jour du todo :', err);
//         res.status(500).send('Erreur lors de la mise à jour du todo');
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });

// //update todo title  //dans le body il faut avoir le meme nom que on envois dans le client
// app.put('/todosTitle/:Id', (req, res) => {
//   const Id = req.params.Id;
//   const { newTitle  } = req.body;
//   console.log("title ",newTitle );

//   connection.query(
//     'UPDATE todos SET title = ? WHERE id = ?',
//     [newTitle , Id],
//     (err, result) => {
//       if (err) {
//         console.error('Error updating todo :', err);
//         res.status(500).send('Error updating todo');
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });


// //update posts
// app.put('/posts/:Id', (req, res) => {
//   const Id = req.params.Id;
//   const title = req.body.title;
//   const body = req.body.body;

//   connection.query(
//     'UPDATE posts SET title = ?, body = ? WHERE id = ?',
//     [title, body, Id],
//     (err, result) => {
//       if (err) {
//         console.error('Erreur lors de la mise à jour du post :', err);
//         res.status(500).send('Erreur lors de la mise à jour du post');
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });

// //update comment
// app.put('/comments/:Id', (req, res) => {
//   const Id = req.params.Id;
//   const name = req.body.name;
//   const body = req.body.body;

//   connection.query(
//     'UPDATE comments SET name = ?, body = ? WHERE id = ?',
//     [name, body, Id],
//     (err, result) => {
//       if (err) {
//         console.error('Erreur lors de la mise à jour du post :', err);
//         res.status(500).send('Erreur lors de la mise à jour du post');
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });


// //add todo
// app.post('/:userId/todos', (req, res) => {
//   const userId = req.params.userId;
//   const todo = req.body;

//   const todoToAdd = {
//     userId: userId,
//     title: todo.title,
//     completed: todo.completed
//   };

//   connection.query('INSERT INTO todos SET ?', [todoToAdd], (err, result) => {
//     if (err) {
//       console.error('Error while executing the query: ', err);
//       res.status(500).send('Error adding the todo');
//     } else {
//       const todoId = result.insertId;
//       const addedTodo = {
//         id: todoId,
//         userId: userId,
//         title: todo.title,
//         completed: todo.completed
//       };
//       res.status(201).json(addedTodo);
//     }
//   });
// });

// //have comments //work
// app.get('/posts/:postid/comments', (req, res) => {
//   const postId = req.params.postid;

//   connection.query('SELECT * FROM comments WHERE postId = ?', [postId], (err, rows) => {
//     if (err) {
//       console.error('Erreur lors de l\'exécution de la requête :', err);
//       res.status(500).send('Erreur lors de la récupération des comments');
//     } else {
//       if (rows.length === 0) {
//         res.status(404).send('No comments found');
//       } else {
//         const comments = rows.map(comment => ({
//           id: comment.id,
//           postId:comment.postId,
//           name: comment.name,
//           email: comment.email,
//           body:comment.body
//         }));
//         res.json(comments);
//       }
//     }
//     // connection.end();
//   });
// });

// //add comment //work //jai change comment en commentToAdd a la fin
// app.post('/:postId/:email/comments', (req, res) => {
//   const postId = req.params.postId;
//   const email=req.params.email;
//   const comment = req.body;
//   console.log("postId ",postId);
//   console.log("email ",email);
//   console.log("comment ",comment);

//   const commentToAdd = {
//     postId:postId,
//     name: comment.name,
//     body: comment.body,
//     email: email
//   };

//   connection.query('INSERT INTO comments SET ?', [commentToAdd], (err, result) => {
//     if (err) {
//       console.error('Error while executing the query: ', err);
//       res.status(500).send('Error adding the comment');
//     } else {
//       const commentId = result.insertId;
//       const addedComment = {
//         id: commentId,
//         postId:commentToAdd.postId,
//         name: commentToAdd.name,
//         email:commentToAdd.email,
//         body: commentToAdd.body

//       };

//       console.log("addedComment ",addedComment);

//       res.status(201).json(addedComment);
//     }
//   });
// });


// app.get('/:userid/albums', (req, res) => {
//   const userId = req.params.userid;

//   connection.query('SELECT * FROM albums WHERE userId = ?', [userId], (err, rows) => {
//     if (err) {
//       console.error('Erreur lors de l\'exécution de la requête :', err);
//       res.status(500).send('Erreur lors de la récupération des albums');
//     } else {
//       if (rows.length === 0) {
//         res.status(404).send('No albums found');
//       } else {
//         const albums = rows.map(album => ({
//           id: album.id,
//           userId:album.userId,
//           title:album.title
//         }));
//         res.json(albums);
//       }
//     }
//     // connection.end();
//   });
// });


// app.get('/albums/:albumId/photos', (req, res) => {
//   const albumId = req.params.albumId;

//   connection.query('SELECT * FROM photos WHERE albumId = ?', [albumId], (err, rows) => {
//     if (err) {
//       console.error('Erreur lors de l\'exécution de la requête :', err);
//       res.status(500).send('Erreur lors de la récupération des photos');
//     } else {
//       if (rows.length === 0) {
//         res.status(404).send('No photos found');
//       } else {
//         const photos = rows.map(photo => ({
//           id: photo.id,
//           albumId: photo.albumId,
//           title: photo.title,
//           url: photo.url,
//           thumbnailUrl: photo.thumbnailUrl
//         }));
//         res.json(photos);
//       }
//     }
//   });
// });


app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
