import { Router } from "express";
import { createBooking, getBookings } from "./bookingController";
import auth from "../../middleware/auth";


const router= Router()

router.post("/",auth('admin','customer'), createBooking)
router.get("/", auth('admin','customer'), getBookings)
//  router.put("/::bookingId")
 export  const bookingRoute= router