import { Router } from "express";
import {  deleteUser, getUser, updateUser } from "./userController";
import logger from "../../middleware/verify";
import auth from "../../middleware/auth";
import verify from "../../middleware/verify";


const router= Router()


 router.get("/",  auth('admin'),   getUser)
 router.put("/:userId",auth('admin','customer') ,updateUser)
 router.delete("/:userId", auth('admin'), deleteUser)
 export  const userRoute= router