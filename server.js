const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://anju:anju2003@cluster0.ieorzq5.mongodb.net/?appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (user) {

    res.json({
      success: true,
      message: "Login Successful"
    });

  } else {

    res.status(401).json({
      success: false,
      message: "Invalid Credentials"
    });
  }
});
app.post("/register", async (req, res) => {

  const { email, password } = req.body;

  const newUser = new User({
    email,
    password
  });

  await newUser.save();

  res.json({
    success: true,
    message: "User Registered"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started on port " + PORT);
});