import  { db } from "../../../config/db";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken'
export default function handler(req, res) {
  if ((req.method = "POST")) {
    const { action } = req.body;
    if (action === "register") {
      handleRegister(req, res);
    } else if (action === "login") {
      handleLogin(req, res);
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
async function handleRegister(req, res) {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide name/email/password" });
      }

    const userExist = await new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email=?";
        const values = [email];
        db.query(sql, values, function(error, result) {
          if (error) {
            console.log(error,"error")
            reject(error); 
          } else {
            resolve(result); 
          }
        });
      });
     
      if (userExist.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
    await new Promise((resolve, reject) => {
        const sql = "insert into users (name, email, password) values (?, ?, ?)";
        const values = [name, email, hashedPassword];
        db.query(sql, values, function(error, result) {
          if (error) {
            console.log(error,"error")
            reject(error); 
          } else {
            console.log(result,"result")
            resolve(result); 
          }
        });
      });
      const newUser = { name, email, password };  
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  }
  async function handleLogin(req,res)
  {
    const {email,password}=req.body;
    try{
        if ( !email || !password) {
            return res
              .status(400)
              .json({ message: "Please provide name/email/password" });
          }
          const user = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM users WHERE email=?";
            const values = [email];
            db.query(sql, values, function(error, result) {
              if (error) {
                console.error("Error retrieving user:", error);
                reject(error);
              } else {
                resolve(result[0]); 
              }
            });
          });
     
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Compare hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
          const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      
          if (passwordMatch) {
            // Passwords match, login successful
            res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email,id:user.id },token });
          } else {
            // Passwords don't match
            res.status(401).json({ message: "Invalid credentials" });
          }
    }
    catch(error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
       
      
         
      }
  }
  
