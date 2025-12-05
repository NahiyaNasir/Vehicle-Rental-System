import { Request, Response } from "express";
import { userServices } from "./userService";



export const getUser=async(req: Request, res: Response)=>{
  
 try {
     const result=await userServices.getUser()
    console.log(result.rows);
    res.status(201).json({
      success: true,
      message: "Data  get Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

    
}
export  const updateUser= async(req:Request,res:Response)=>{
    console.log(req.params.userId);
     const { name, email } = req.body;
  try {
   const result=await userServices.updateUser(req.params.userId as string,name ,email)
  console.log(result.rows[0]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
} catch (err: any) {
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

}

export const deleteUser=async(req:Request,res:Response)=>{
  //  console.log(req.params.id);
  try {
   const result=await userServices.deleteUser(req.params.userId as string)
  // console.log(result.rows);
    if (result.rowCount=== 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
} catch (err: any) {
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

}