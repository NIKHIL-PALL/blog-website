const User = require("../model/User");

const getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    return res.status(200).json(allusers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async(req, res) => {
  const {uid} = req.params;

  try{
    const user = await User.findById(uid);
    if(!user) {
      return res.status(404).json({message : "User not found"});
    }
    return res.status(200).json(user);
  }
  catch(err) {
    res.status(500).json({message : err.message});
  }
}
const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email) return res.status(409).json({message : "Email is required."});
  if(!password) return res.status(409).json({message : "Password is required"});
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "No existing user found. Try Signing up instead" });
    }
    if (password === existingUser.password) {
      return res.status(200).json(existingUser);
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    return res.status(409).json({message : "Please fill all the details."});
  }
  if(!email.includes("@")) return res.status(409).json({message : "Please enter a valid email"});

  if(password.length < 6) return res.status(409).json({message : "Password must contain atleast 6 letters."})


  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please try login instead" });
    }
    
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  login,
  signup,
  getAllUsers,
  getUserById
};
