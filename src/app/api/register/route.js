import  { db } from "../../../../config/db";
const bcrypt = require('bcrypt');
import path from "path";
import { writeFile } from "fs/promises";
export async function POST(req, res) {
    const data = await req.json();  
        {
            const sql1 = "SELECT * FROM users WHERE email=?";
            const values1 = [data.email];
      try{
          if ( !data.name||!data.email || !data.password) {
              return Response.json({ error :"please provide name/email/password"}, { status: 400 });
            }
            const [result2] = await db.query(sql1, values1);
           console.log(result2,"result")
            if (result2) {
              return Response.json({ error:"user already exists" }, { status: 404 });
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const sql2 = "insert into users (name, email, password) values (?, ?, ?)";
            const values2 = [data.name, data.email, hashedPassword];
            const [result1] = await db.query(sql2, values2);
            if(result1)
                {
                     return Response.json({ message:"data added" }, { status: 200 });
                }
                const newUser = { name:result1.name, email:result1.email, password:result1.password };  
                return Response.json({ message:"data added" }, { status: 200 },{user:newUser});
      }
       catch (error) {
         
        return Response.json({ error }, { status: 500 });
      }
        }
       
       
 
  }
  export async function PUT (request, res) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log(id)
 const formData = await request.formData();
    const file = formData.get("profile_img");
    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const working = formData.get("working");
    console.log(file,"file")
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_"); 
    console.log(filename,"filename")
    try {
     
     await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    const sql =
    "UPDATE users SET name = ?,email = ?,profile_img = ?, mobile = ?,working = ? WHERE id = ?"
     
    const values = [name,email,filename, mobile,working,id];
    try {
      const result = await db.query(sql, values);
      return Response.json({ result }, { status: 200 },{message:"profile updated"});
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
    
     
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }
  export async function GET(req, res) {
    const sql = "SELECT * FROM users ";
    try {
      const [data] = await db.query(sql);
      return Response.json({ data }, { status: 200 });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }