import config from "./config";
import express  from "express";
const port = config.port;
const app = express();
// parser
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});