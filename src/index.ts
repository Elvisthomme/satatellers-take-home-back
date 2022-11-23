import express, { Express } from "express";
import db from "./config/database.config";
import { patientAppointmentRouter } from "./routes/patientAppointmentRouter";
import cors from "cors";

db.sync().then(() => {
  console.log("connect to db");
});
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(patientAppointmentRouter);
const port = 8000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
