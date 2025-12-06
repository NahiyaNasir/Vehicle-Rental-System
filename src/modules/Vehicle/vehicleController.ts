import { Request, Response } from "express";
import { vehicleServices } from "./vehicleService";



export const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getVehicles=async(req: Request, res: Response)=>{
  
 try {
     const result=await  vehicleServices.getVehicles()
    console.log(result.rows);
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

    
}
export  const getSingleVehicle= async(req:Request,res:Response)=>{
    console.log(req.params.vehicleId);
  try {
   const result=await   vehicleServices.getSingleVehicle(req.params.vehicleId as string)
  console.log(result.rows[0]);
  res.status(200).json({
    success: true,
    message: "Vehicle retrieved successfully",
    data: result.rows[0],
  });
} catch (err: any) {
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

}

export  const updateVehicle= async(req:Request,res:Response)=>{
    console.log(req.params.vehicleId);
     const { daily_rent_price,availability_status } = req.body;
  try {
   const result=await vehicleServices.updateVehicle(req.params.vehicleId as string,daily_rent_price,availability_status)
  console.log(result.rows[0]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle updated  successfully",
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

export const deleteVehicle=async(req:Request,res:Response)=>{
   console.log(req.params.vehicleId);
  try {
   const result=await  vehicleServices.deleteVehicle(req.params.vehicleId as string)
  // console.log(result.rows);
  

  ;
    if (result.rowCount=== 0) {
      res.status(404).json({
        success: false,
        message: "vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle deleted successfully",
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
