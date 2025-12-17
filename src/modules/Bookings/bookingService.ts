import { pool } from "../../config/Db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleResult = await pool.query(
    `SELECT daily_rent_price, vehicle_name FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  
//  if (vehicleResult.rows.length === 0) {
//     throw new Error(`Vehicle not found with id: ${vehicle_id}`);
//   }
  const daily_rent_price = Number(vehicleResult.rows[0].daily_rent_price);
  console.log(daily_rent_price);
  const number_of_days =
    (new Date(rent_end_date as string).getTime() -
      new Date(rent_start_date as string).getTime()) /
    (1000 * 60 * 60 * 24);
  console.log(number_of_days, "number_of_days");

  if (number_of_days <= 0) {
    throw new Error("Rent end date must be after start date.");
  }
  const total_price = daily_rent_price * number_of_days;
  console.log(total_price);

  const result = await pool.query(
    `INSERT INTO bookings(  customer_id, vehicle_id ,rent_start_date,rent_end_date, total_price, status ) VALUES($1, $2, $3,$4,$5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  //  const insertedBooking = result.rows[0];
  // return {
  //       id: insertedBooking.id,
  //       customer_id: insertedBooking.customer_id,
  //       vehicle_id: insertedBooking.vehicle_id,
  //       rent_start_date: insertedBooking.rent_start_date,
  //       rent_end_date: insertedBooking.rent_end_date,
  //       total_price: insertedBooking.total_price,
  //       status: insertedBooking.status,
  //       vehicle: {
  //           vehicle_name: vehicleResult.rows[0].vehicle_name,
  //           daily_rent_price: daily_rent_price,
  //       }}
  return result;
};
const getBookings = async (userId:string) => { 
  const result = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`,[userId]);
  return result;
};

const updateBookingStatus = async (bookingId: string, status: string) => {
  const bookingUpdateResult = await pool.query(
    `UPDATE bookings SET  status=$1  WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  const vehicleUpdateResult = await pool.query(
    `UPDATE vehicles v SET availability_status = CASE 
               WHEN $1 IN ('active', 'booked') THEN 'booked'
                WHEN $1 IN ('returned', 'cancelled') THEN 'available'
             END
 FROM bookings b
  WHERE v.id = (
     SELECT b.vehicle_id FROM bookings b WHERE b.id = $2
   )
      RETURNING v.availability_status`
     ,
    [status,bookingId]
  );

  return {
    booking: bookingUpdateResult,
    vehicle: vehicleUpdateResult,
  };
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBookingStatus,
};




