require('dotenv').config();
const port=process.env.PORT || 8080;
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const connecttomongo= require("./models/db");
connecttomongo();

//const { Server } = require('socket.io');
//const { createServer } = require('node:http');

//const server = createServer(app);
//const io = new Server(server);

//var usp= io.of("/user-namespace");

//usp.on("connection",function(socket){
  //  console.log("user Connected");

    //socket.on("disconnect",function(){
      //  console.log("user disconnected");

    //});
//});


 app.get("/", (req, resp) => {
	resp.send("Hello world");
});
app.use(express.json());

app.use('/reg',require ("./routes/reg"));
app.use('/otproutes',require ("./routes/otproutes"));
app.use('/logOutroute',require ("./routes/logOutroute"));



   app.listen(port, function() {
    console.log("Server started on port "+port);
  });
  