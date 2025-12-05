import { Router } from "express";
import {  deleteUser, getUser, updateUser } from "./userController";

const router= Router()


 router.get("/",getUser)
 router.put("/:userId",updateUser)
 router.delete("/:userId",deleteUser)
 export  const userRoute= router