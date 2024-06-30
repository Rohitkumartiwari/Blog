import mysql from 'mysql2/promise';

// Create a connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306, // Default MySQL port is 3306
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0 
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.promise().query(query, values);
    return results[0]; 
  } catch (error) {
    console.error('Error executing query:', error);
    return { error };
  }
}
