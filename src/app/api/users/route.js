import { db } from "../../../../config/db";
export async function GET(req, res) {
  const sql = "SELECT * FROM employee ";
  try {
    const [data] = await db.query(sql);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req, res) {
  const data = await req.json();
  const EmpAge = parseInt(data.EmpAge);
  const sql =
    "INSERT INTO employee (EmpName, EmpAge, EmpCompany) VALUES (?, ?, ?)";
  const values = [data.EmpName, EmpAge, data.EmpCompany];
  try {
    const [result] = await db.query(sql, values);
   
    return Response.json({ result }, { status: 200 });
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
  const sql = "DELETE FROM employee WHERE id = ?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT (request, res) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const data = await request.json();
  const EmpAge = parseInt(data.EmpAge);
  if (!id) {
    return  Response.json({ status: 400 });
   }
  const sql =
    "UPDATE employee SET EmpName = ?, EmpAge = ?,EmpCompany = ? WHERE id = ?,";
  const values = [data.EmpName, EmpAge, data.EmpCompany,id];
  try {
    const result = await db.query(sql, values);
  
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}













 
