import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface PatientAppointmentAttribute {
  id: number;
  uniqueCode: string;
  patientName: string;
  patientPhone: string | null | undefined;
  patientAddress: string | null | undefined;
  patientCity: string | null | undefined;
  patientEmail: string;
  patientAge: number;
  patientSex: string;
  isFirstTime: boolean;
  commentBefore: string;
  commentAfter: string;
  appointmentStatus: string;
  appointmentDate: Date;
  appointmentTime: Date;
  bookingDate: Date;
}

/**
 * ORM representation of a patient appointment
 */
class PatientAppointmentInstance extends Model<PatientAppointmentAttribute> {}

PatientAppointmentInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uniqueCode: {
      type: DataTypes.STRING,
      comment: "a unique code of the format A[SN][DD][MM][YY]",
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientPhone: {
      type: DataTypes.STRING,
    },
    patientAddress: {
      type: DataTypes.STRING,
    },
    patientCity: {
      type: DataTypes.STRING,
    },
    patientAge: {
      type: DataTypes.INTEGER,
    },
    patientEmail: {
      type: DataTypes.STRING,
    },
    patientSex: {
      type: DataTypes.STRING,
    },
    appointmentStatus: {
      type: DataTypes.STRING,
    },
    commentBefore: {
      type: DataTypes.STRING,
    },
    commentAfter: {
      type: DataTypes.STRING,
    },
    isFirstTime: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    appointmentTime: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
  }
);

export { PatientAppointmentInstance };
