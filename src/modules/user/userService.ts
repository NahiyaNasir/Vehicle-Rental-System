import { pool } from "../../config/Db";


  const  getUser=async()=>{
  const result = await pool.query(`SELECT * FROM users`);
  return result;
 }

   const updateUser=async(userId:string,name:string,email:string,role:string,phone:string)=>{
    const result= await pool.query(`UPDATE users SET name=$1, email=$2,role=$3,phone=$4  WHERE id=$$ RETURNING *`,[name,email,role,phone,userId])
    return  result
  }
  const deleteUser=async(userId:string)=>{
    const activeBookings = await pool.query(
    `SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'`,
    [userId]
  
  );
    if (activeBookings.rows.length > 0) {
    throw new Error(
      "Cannot delete user. They have active bookings that must be completed or cancelled first."
    );
  }
     const result= await pool.query(` DELETE FROM  users WHERE  id=$1 RETURNING *`,[userId])
    return  result
  }
  export const userServices = {
  getUser,
  updateUser,
  deleteUser,
}