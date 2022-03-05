const express = require("express");
const { success, error } = require("consola");
const http = require('http');
const { connect } = require("mongoose");

// Bring in the app constants
const { DB,PORT } = require("./config");

// Initialize the application
const app = express();


// Initialize server
const server = http.createServer(app);

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// User Router Middleware
app.use("/api/book", require("./routes/book"));

const startApp = async () => {
  try {

    // Connection With DB
    await connect(DB, {
        // useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true
      });

    // Start Listenting for the server on PORT
    server.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );

  } catch (err) {
    error({
      message:err,
      badge: true
    });
    startApp();
  }
};

startApp();
