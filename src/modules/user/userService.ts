import { pool } from "../../config/Db";
import bcrypt from "bcryptjs";
 const createUser=async(payload: Record<string, unknown>)=>{
      const { name,  email, password,role,phone } = payload;
      
  const hashedPass = await bcrypt.hash(password as string, 10);
  console.log(hashedPass,"hash");
    console.log(payload);

      const result = await pool.query(
    `INSERT INTO users(name, email, password,role,phone) VALUES($1, $2, $3,$4,$5) RETURNING *`,
    [name, email,hashedPass,role,phone  ]
  );

  return result;
 }

  const  getUser=async()=>{
  const result = await pool.query(`SELECT * FROM users`);
  return result;
 }

   const updateUser=async(userId:string,name:string,email:string)=>{
    const result= await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email,userId])
    return  result
  }
  const deleteUser=async(userId:string)=>{
     const result= await pool.query(` DELETE FROM  users WHERE  id=$1 RETURNING *`,[userId])
    return  result
  }
  export const userServices = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
}