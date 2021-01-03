const express = require('express');
const connectDB = require('./config/db')
const path = require("path")

const app = express();

// Connect Database 
connectDB()

// Init Middleware
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('API Running on port' + PORT);
// });

// Define Routes
app.use("/api/posts", require("./routes/api/posts"))

// Server static assets in production
if (process.env.NODE_ENV === "production") {
    // Set Static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`);
});
