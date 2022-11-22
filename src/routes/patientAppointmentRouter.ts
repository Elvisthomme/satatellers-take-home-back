import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import validationMiddleWare from "../middleware/validationMiddleWare";
import { PatientAppointmentInstance } from "../model/patientAppointment";
import validator from "../validator/patientAppointmentValidator";
const router = Router();
const endPoint = "/api/patient-appointment/";
const pageSize = 10;

router.get(
  endPoint,
  // validator.checkPage(),
  // validationMiddleWare.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      // let page = req.query?.page as number | undefined;
      // if (page == undefined) page = 1;
      // const offset = (page - 1) * pageSize;
      const records = await PatientAppointmentInstance.findAll({
        where: {},
        // offset: offset,
        // limit: pageSize,
      });
      const missedCount = records.filter(
        (e) => e.dataValues.appointmentStatus == "missed"
      ).length;
      const rescheduledCount = records.filter(
        (e) => e.dataValues.appointmentStatus == "rescheduled"
      ).length;
      const passedCount = records.filter(
        (e) => e.dataValues.appointmentStatus == "passed"
      ).length;
      const total = await records.length;
      // if (total == 0) {
      //   return res.status(404).json({ message: "no record" });
      // }
      // return res.json({ data: records, total: total });
      return res.json({
        data: records,
        missed: missedCount,
        passed: passedCount,
        total: total,
        rescheduled: rescheduledCount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "fail to read patient appointment",
        endPoint: endPoint,
      });
    }
  }
);

router.get(
  `${endPoint}:id`,
  validator.checkDeleteAndGetById(),
  validationMiddleWare.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await PatientAppointmentInstance.findOne({
        where: { id },
      });
      if (!record) {
        return res.status(404).json({ message: `no record with the id ${id}` });
      }
      return res.json(record);
    } catch (error) {
      return res.status(500).json({ message: "fail to read", error: error });
    }
  }
);

router.post(
  endPoint,
  validator.checkCreatePatientAppointment(),
  validationMiddleWare.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const record = await PatientAppointmentInstance.create({
        ...req.body,
        id: null,
      });
      const bookingDate = record.dataValues.bookingDate;
      const SN = record.dataValues.id.toString().padStart(2, "0");
      const DD = bookingDate.getDay().toString().padStart(2, "0");
      const MM = bookingDate.getMonth().toString().padStart(2, "0");
      const bookingYear = bookingDate.getFullYear().toString();
      const YY = bookingYear.substring(bookingYear.length - 2);
      record.update({
        uniqueCode: `A${SN}${DD}${MM}${YY}`,
      });
      return res.status(201).json(record);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "fail to create appointment", error: error });
    }
  }
);
router.put(
  `${endPoint}:id`,
  validator.checkUpdatePatientAppointment(),
  validationMiddleWare.handleValidationError,

  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await PatientAppointmentInstance.findOne({
        where: { id },
      });
      if (!record) {
        return res.status(404).json({
          message: `no record with the id ${id}`,
        });
      }
      record.update({ ...req.body });
      return res.json(record);
    } catch (error) {
      return res.status(500).json({ message: "fail to create appointment" });
    }
  }
);

export { router as patientAppointmentRouter };
