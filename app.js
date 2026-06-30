const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 
 
// Create MySQL connection 
const connection = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'RP738964$', 
    database: 'c237_studentlistapp' 
}); 
 
connection.connect((err) => { 
    if (err) { 
        console.error('Error connecting to MySQL:', err); 
        return; 
    } 
    console.log('Connected to MySQL database'); 
}); 
 
// Set up view engine 
app.set('view engine', 'ejs'); 
//  enable static files 
app.use(express.static('public')); 
// enable form processing
app.use(express.urlencoded({ 
    extended: false 
}));

// Define routes
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM student';
  // Fetch data from MySQL
  connection.query( sql , (error, results) => {
    if (error) {
      console.error('Database query error:', error.message); // Remind the developer that there is an error in retrieving student data
      // Remind the client that there is an error in retrieving student data
      return res.send('Error Retrieving student data from the database.'); 
    }
   // Render HTML page with data
   res.render('index', { student: results }); // This result passed to the index.ejs file as student data to be displayed in the browser
  });
});

// Route to fetch student by ID
app.get('/student/:id', (req, res) => { // :id is a route parameter that will be used to fetch the student by ID
  // Extract the student ID from the request parameters
  const studentId = req.params.id;
  const sql = 'SELECT * FROM student WHERE studentId = ?'; // parameterized query to prevent SQL injection
  // Fetch data from MySQL based on the student ID
  connection.query( sql , [studentId], (error, results) => {
    if (error) {
      console.error('Database query error:', error.message); 
      return res.send('Error Retrieving student by ID'); 
    }
    // Check if any student with the given ID was found
    if (results.length > 0) {
      // Render HTML page with the student data
      res.render('student', { student: results[0] });
    } else {
      // If no student with the given ID was found
      res.send('Student not found');
    }
  });
});  

// Route to display the add student form
app.get('/addStudent', (req, res) => {
  res.render('addStudent'); 
});
// Route to handle form submission for adding a new student
app.post('/addStudent', (req, res) => {
  // Extract student data from the request body
  const { name, dob, contact, image } = req.body;
  const sql = 'INSERT INTO student (name, dob, contact, image) VALUES (?, ?, ?, ?)';
  // Insert the new student into the database
  connection.query( sql , [name, dob, contact, image], (error, results) => {
    if (error) {
      // Handle any error that occurs during the database operation
      console.error("Error adding student:", error);
      res.send('Error adding student');
    } else {
      // Send a success response
      res.redirect('/');
    }
  });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 