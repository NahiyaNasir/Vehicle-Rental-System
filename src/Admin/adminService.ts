import { pool } from "../config/Db";

export   const getBookingsAdmin = async () => { 
  const result = await pool.query(`SELECT * FROM bookings `,);
  return result;
};