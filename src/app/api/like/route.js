import { db } from "../../../../config/db";
export async function POST(req,res)
{
const data=await req.json();
try {
    const sql =
    "INSERT INTO likeblog (user_id,post_id) VALUES (?, ?)";
  const values = [data.user_id, data.post_id];
  try {
    const [result] = await db.query(sql, values);
   
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
   
   
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
export async function GET(req, res) {
    const sql = " SELECT * FROM likeblog l INNER JOIN blogs g ON l.post_id=g.post_id ";
    try {
      const [data] = await db.query(sql);
      return Response.json({ data }, { status: 200 });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }