const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/userRoute");
const blogroutes = require("./routes/blogRoutes");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());
const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/mock6?retryWrites=true&w=majority`
    );
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};

// app.use("/", (req,res) => {
//     res.send("welcome to backend ")
// })

app.use("/users", router);
app.use("/blog", blogroutes);
app.listen(8010, () => {
  connect();
  console.log("server is running");
});

//server url
// mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/mock6?retryWrites=true&w=majority
