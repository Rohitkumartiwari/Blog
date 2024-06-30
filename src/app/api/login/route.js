import  { db } from "../../../../config/db";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken'
export async function POST(req, res) {
    const data = await req.json();
    if(data.action=="login")
        {
            const sql = "SELECT * FROM users WHERE email=?";
            const values = [data.email];
      try{
          if ( !data.email || !data.password) {
              return Response.json({ error :"please provide email/password"}, { status: 400 });
            }
            const [result] = await db.query(sql, values);
           
            if (!result) {
              return Response.json({ error:"user not found" }, { status: 404 });
            }
            const passwordMatch = await bcrypt.compare(data.password, result[0].password);
         
            const token = jwt.sign(result[0], process.env.TOKEN_SECRET, { expiresIn: '1h' });
        
            if (passwordMatch) {
             
            return   Response.json({ message: "Login successful", result: { name: result[0].name, email: result[0].email,id:result[0].id },token });
            } else {
             
             return  Response.json({ error: "Invalid credentials" },{ status: 400 });
            }
            
      }
       catch (error) {
         
        return Response.json({ error }, { status: 500 });
      }
        }
        // if(data.action=="register")
        //     {
        //         const sql1 = "SELECT * FROM users WHERE email=?";
        //         const values1 = [data.email];
        //   try{
        //       if ( !data.name||!data.email || !data.password) {
        //           return Response.json({ error :"please provide name/email/password"}, { status: 400 });
        //         }
        //         const [result2] = await db.query(sql1, values1);
        //        console.log(result2,"result")
        //         if (result2) {
        //           return Response.json({ error:"user already exists" }, { status: 404 });
        //         }
        //         const hashedPassword = await bcrypt.hash(data.password, 10);
        //         const sql2 = "insert into users (name, email, password) values (?, ?, ?)";
        //         const values2 = [data.name, data.email, hashedPassword];
        //         const [result1] = await db.query(sql2, values2);
        //         if(result1)
        //             {
        //                  return Response.json({ message:"data added" }, { status: 200 });
        //             }
        //             const newUser = { name:result1.name, email:result1.email, password:result1.password };  
        //             return Response.json({ message:"data added" }, { status: 200 },{user:newUser});
        //   }
        //    catch (error) {
             
        //     return Response.json({ error }, { status: 500 });
        //   }
        //     }
 
  }