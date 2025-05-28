const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config();
const connDb = require('./config/db');
const blogRoutes = require('./routes/blogRoute');

app.get('/',(req,res)=>{
    res.send("Home page fetched");
});

app.use(cors());
connDb();
app.use(express.json());
app.use('/blog',blogRoutes);
app.listen(process.env.PORTNO,()=>{
    console.log("Server running on port no",process.env.PORTNO);
})

