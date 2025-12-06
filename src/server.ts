import config from "./config";
import express, { Request, Response }  from "express";
import { userRoute } from "./modules/user/userRoute";
import { authRoutes } from "./modules/auth/authRoute";
import { vehicleRoute } from "./modules/Vehicle/vehicleRoute";
import logger from "./middlewar/logger";
import { bookingRoute } from "./modules/Bookings/bookingRoute";

const port = config.port;
const app = express();
// parser
app.use(express.json());


// user
app.use("/api/v1/user",userRoute)
// login register
app.use("/api/v1/auth",authRoutes)
// vehicle
app.use("/api/v1/vehicles",vehicleRoute)
//  booking
app.use("/api/v1/bookings",bookingRoute)
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});