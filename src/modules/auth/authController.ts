
import { Request, Response } from "express";
import { authServices } from "./authService";


 const registerUser=async(req: Request, res: Response)=>{
      // const {   name,email, password,role,phone } = req.body;
      // console.log(req.body);
     
    try {
    const result = await authServices.registerUser(req.body);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "register successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
 }

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);
    // console.log(result.rows[0]);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  loginUser,
  registerUser
};





 









