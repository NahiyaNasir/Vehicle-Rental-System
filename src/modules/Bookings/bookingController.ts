import { Request, Response } from "express";
import { bookingServices } from "./bookingService";
import { getBookingsAdmin } from "../../Admin/adminService";



export const createBooking = async (req: Request, res: Response) => {
  try {
    

    const result = await  bookingServices.createBooking(req.body);
    console.log(result.rows[0]);
    
    res.status(201).json({
      success: true,
      message: "Booking created successfully",

      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBookings=async(req: Request, res: Response)=>{
  const user = req?.user  as any
 try {

if (user.role !=='admin') {
   const userId = user?.id;
   const result=await  bookingServices.getBookings(userId)
    console.log(result.rows);
    res.status(200).json({
      success: true,
      message: "booking retrieved successfully",
      data: result.rows,
    });
}
const result=await   getBookingsAdmin()
    console.log(result.rows);
    res.status(200).json({
      success: true,
      message: "booking retrieved successfully",
      data: result.rows,
    });
 
     
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

    
}

export  const updateBooking= async(req:Request,res:Response)=>{
    console.log(req.params.bookingId);
       const { status}=req.body
         const user = req?.user  as any
         console.log(user);
      //  console.log(req.body);
  try {

if (user.role === 'customer' && status !== 'cancelled') {
  return res.status(403).json({
    success: false,
    message: "Customer can only cancel booking",
  });
}

if (user.role === 'admin' && status !== 'returned') {
  return res.status(403).json({
    success: false,
    message: "Admin can only mark booking as returned",
  });
}


   const result=await bookingServices.updateBookingStatus(req.params.bookingId as string,status)
  // console.log(result.rows[0]);
  
    if (result.booking.rows.length === 0 || result.vehicle.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "booking not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: " booking status updated  successfully",
        data: {
                
                booking: result.booking.rows[0], 
                vehicle: result.vehicle.rows[0] 
             
            },
         
      });
    }
} catch (err: any) {
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

}