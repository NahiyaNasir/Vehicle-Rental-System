import { pool } from "../../config/Db";


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
  getUser,
  updateUser,
  deleteUser,
}