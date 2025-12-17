import { Router } from "express";
import {  deleteUser, getUser, updateUser } from "./userController";

import auth from "../../middleware/auth";



const router= Router()


 router.get("/",  auth('admin'),   getUser)
 router.put("/:userId",auth('admin','customer') ,updateUser)
 router.delete("/:userId", auth('admin'), deleteUser)
 export  const userRoute= router