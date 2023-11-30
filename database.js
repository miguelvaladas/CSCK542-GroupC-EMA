import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

//initialize the database connection
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'testtest',
  database: 'mydb'
}).promise();


export default pool;
