import { Router } from "express";
import {  deleteUser, getUser, updateUser } from "./userController";

const router= Router()


 router.get("/",getUser)
 router.put("/:id",updateUser)
 router.delete("/:id",deleteUser)
 export  const userRoute= router