import { body, param } from "express-validator";

class PatientAppointmentValidator {
  checkCreatePatientAppointment() {
    return [
      body("patientName")
        .notEmpty()
        .withMessage("The patient name is required")
        .isString()
        .withMessage("The patient name must be a string"),
      body("patientAddress")
        .optional()
        .isString()
        .withMessage("The patient address must be a string"),
      body("patientCity")
        .optional()
        .isString()
        .withMessage("The patient city must be a string"),
      body("patientAge")
        .optional()
        .isNumeric()
        .withMessage("The patient age must be a string"),
      body("patientEmail")
        .optional()
        .isEmail()
        .withMessage("The patient email must be a valid email"),
      body("patientSex")
        .optional()
        .isIn(["male", "female"])
        .withMessage("The patient sex must be male or female"),
      body("appointmentStatus")
        .optional()
        .isIn(["passed", "missed", "rescheduled", "pending"])
        .withMessage(
          "The appointment status must be in ['passed', 'missed', 'rescheduled', 'pending']"
        ),
      body("commentBefore")
        .optional()
        .isNumeric()
        .withMessage("The comment before must be a string"),
      body("commentAfter")
        .optional()
        .isNumeric()
        .withMessage("The comment after must be a string"),
      body("isFirstTime")
        .optional()
        .isBoolean()
        .withMessage("Is first time must be true of false")
        .default(false),
      body("appointmentDate")
        .notEmpty()
        .withMessage("The appointment date is required")
        .isDate()
        .withMessage("The appointment date most be a date"),
      body("appointmentTime")
        .notEmpty()
        .withMessage("The appointment time is required")
        .isDate()
        .withMessage("The appointment time most be a date"),
    ];
  }
  checkUpdatePatientAppointment() {
    return [
      body("id")
        .notEmpty()
        .withMessage("The patient id is required")
        .isInt()
        .withMessage("The patient id must be a number"),
      body("patientName")
        .optional()
        .isString()
        .withMessage("The patient name must be a string"),
      body("patientAddress")
        .optional()
        .isString()
        .withMessage("The patient address must be a string"),
      body("patientCity")
        .optional()
        .isString()
        .withMessage("The patient city must be a string"),
      body("patientAge")
        .optional()
        .isNumeric()
        .withMessage("The patient age must be a string"),
      body("patientEmail")
        .optional()
        .isEmail()
        .withMessage("The patient email must be a valid email"),
      body("patientSex")
        .optional()
        .isIn(["male", "female"])
        .withMessage("The patient sex must be male or female"),
      body("appointmentStatus")
        .optional()
        .isIn(["passed", "missed", "rescheduled", "pending"])
        .withMessage(
          "The appointment status must be in ['passed', 'missed', 'rescheduled', 'pending']"
        ),
      body("commentBefore")
        .optional()
        .isNumeric()
        .withMessage("The comment before must be a string"),
      body("commentAfter")
        .optional()
        .isNumeric()
        .withMessage("The comment after must be a string"),
      body("isFirstTime")
        .optional()
        .isBoolean()
        .withMessage("Is first time must be true of false"),
      body("appointmentDate")
        .optional()
        .isDate()
        .withMessage("The appointment date most be a date"),
    ];
  }
  checkDeleteAndGetById() {
    return [
      param("id")
        .notEmpty()
        .withMessage("The patient id is required")
        .isInt()
        .withMessage("The patient id must be a number"),
    ];
  }
  checkPage() {
    return [
      param("page").optional().isInt().withMessage("The page must be a number"),
    ];
  }
}

export default new PatientAppointmentValidator();
