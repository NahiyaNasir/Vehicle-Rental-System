import { Router } from "express";
import {
  createVehicle,
  deleteVehicle,
  getSingleVehicle,
  getVehicles,
  updateVehicle,
} from "./vehicleController";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), createVehicle);
router.get("/", getVehicles);
router.get("/:vehicleId", getSingleVehicle);
router.put("/:vehicleId", auth("admin"), updateVehicle);
router.delete("/:vehicleId", auth("admin"), deleteVehicle);
export const vehicleRoute = router;
