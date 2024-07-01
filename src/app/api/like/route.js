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
    const sql = "SELECT user_id,post_id FROM likeblog group by post_id,user_id order by post_id";
    try {
      const [data] = await db.query(sql);
      return Response.json({ data }, { status: 200 });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }

  export async function DELETE(request, res) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
     return  Response.json({ status: 400 });
    }
    const sql = "DELETE FROM likeblog WHERE post_id = ?";
    const values = [id];
    try {
      const result = await db.query(sql, values);
      return Response.json({ result }, { status: 200 },{message:"blog delete successfully"});
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }