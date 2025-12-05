
import { Router } from "express";
import { createVehicle, deleteVehicle, getSingleVehicle, getVehicles, updateVehicle } from "./vehicleController";


const router= Router()

router.post("/",createVehicle)
 router.get("/",getVehicles)
 router.get("/:vehicleId",getSingleVehicle) 
 router.put("/:vehicleId",updateVehicle)
 router.delete("/:vehicleId",deleteVehicle)
 export  const vehicleRoute= router