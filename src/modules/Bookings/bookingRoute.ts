import { Router } from "express";
import { createBooking, getBookings, updateBooking } from "./bookingController";
import auth from "../../middleware/auth";


const router= Router()

router.post("/",auth('admin','customer'), createBooking)
router.get("/", auth('admin','customer'), getBookings)
 router.put("/:bookingId",auth('admin','customer'), updateBooking)
 export  const bookingRoute= router