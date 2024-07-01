import { db } from "../../../../config/db";
export async function POST(req,res)
{
    const data=await req.json();
    try{
        const sql =
        "INSERT INTO comment (post_id,user_id,comment) VALUES (?, ?,?)";
      const values = [data.post_id, data.user_id,data.comment];
      try {
        const [result] = await db.query(sql, values);
        return Response.json({ result }, { status: 200 });
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
    }
    catch(error)
    {
        return Response.json({ error }, { status: 500 })
    }
}

export async function GET(req, res) {
    const sql = "select users.name,users.id,users.email,users.profile_img,comment.comment,comment.post_id from users inner join comment on users.id=comment.user_id";
    try {
      const [data] = await db.query(sql);
      return Response.json({ data }, { status: 200 });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }