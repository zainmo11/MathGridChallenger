const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Define the port for your Express server.

// Use the Railway environment variable to set the static files path.
// Railway will set this variable to the correct path for your deployed app.
const staticFilesPath = process.env.RAILWAY_STATIC_FILES_PATH || '/dist/math-grid-challenge/';

// Set up a middleware to serve static files (like CSS, JavaScript, etc.) from the specified path.
app.use(express.static(path.join(__dirname, staticFilesPath)));

// Define a route to handle all other requests and serve the Angular app's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, staticFilesPath, 'index.html'));
});

// Start the Express server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
