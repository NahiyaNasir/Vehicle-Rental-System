
import { Router } from "express";
import { authController,} from "./authController";



  const router= Router()
   router.post("/signup",authController.registerUser)
   router.post("/signin",authController.loginUser)
  
   export const authRoutes = router;