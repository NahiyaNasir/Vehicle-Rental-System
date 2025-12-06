import { Router } from "express";
import { createBooking, getBookings } from "./bookingController";


const router= Router()

router.post("/",createBooking)
router.get("/",getBookings)
//  router.put("/::bookingId")
 export  const bookingRoute= router