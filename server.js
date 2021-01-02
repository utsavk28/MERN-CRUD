const express = require('express');
const connectDB = require('./config/db')
const app = express();

// Connect Database 
connectDB()

// Init Middleware
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API Running on port' + PORT);
});

// Define Routes
app.use("/api/posts",require("./routes/api/posts"))

app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`);
});
