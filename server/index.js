require('dotenv').config();
const port=process.env.PORT || 8080;
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const connecttomongo= require("./models/db");
connecttomongo();


 app.get("/", (req, resp) => {
	resp.send("Hello world");
});
app.use(express.json());

app.use('/reg',require ("./routes/reg"));
app.use('/otproutes',require ("./routes/otproutes"));

   app.listen(port, function() {
    console.log("Server started on port "+port);
  });
  