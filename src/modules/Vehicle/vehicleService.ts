
import { pool } from "../../config/Db";



 const createVehicle=async(payload: Record<string, unknown>)=>{
      const { vehicle_name,type, registration_number, daily_rent_price, availability_status} = payload; 
    console.log(payload);
      const result = await pool.query(
    `INSERT INTO vehicles( vehicle_name,type, registration_number, daily_rent_price, availability_status ) VALUES($1, $2, $3,$4,$5) RETURNING *`,
    [ vehicle_name, type, registration_number, daily_rent_price, availability_status  ]
  );

  return result;
 }
  const  getVehicles=async()=>{
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
 }


 const getSingleVehicle=async(vehicleId:string)=>{
    const result= await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[vehicleId])
    return  result
  }

  const updateVehicle=async(vehicleId:string,daily_rent_price:number,availability_status:string)=>{
    
    const result= await pool.query(`UPDATE vehicles SET  daily_rent_price=$1, availability_status=$2 WHERE id=$3 RETURNING *`,[  daily_rent_price, availability_status ,vehicleId,])
    return  result
  }

  const deleteVehicle=async(vehicleId:string)=>{
     const result= await pool.query(` DELETE FROM  vehicles WHERE  id=$1 AND rent_end_date >= CURRENT_DATE;`,[vehicleId])
  //    if (result.rows.length > 0) {
  //   return {
  //     blocked: true,
  //     message: "Vehicle cannot be deleted because it has active bookings",
  //   }
  //  }
    return  result
  }

  export const vehicleServices={
   createVehicle,
   getVehicles,
   getSingleVehicle,
   updateVehicle,
   deleteVehicle
  }