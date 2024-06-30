import { db } from "../../../../config/db";
import path from "path";
import { writeFile } from "fs/promises";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get("image_filename");
  const content = formData.get("content");
  const author = formData.get("author");
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  try {
   
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    const sql =
    "INSERT INTO blogs (author, content, image_filename) VALUES(?,?,?)";
  const values = [author, content, filename];
  try {
    const result = await db.query(sql, values);

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
    
  } catch (error) {
    
    console.log("Error occurred ", error);
    return Response.json({ Message: "Failed", status: 500 });
  }
  
};








  


export async function GET(req, res) {
  const sql = " SELECT * FROM users AS u INNER JOIN blogs AS b ON u.id = b.author ";
  try {
    const [data] = await db.query(sql);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
