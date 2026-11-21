import { model, Schema } from "mongoose";
import { Student } from "../../interfaces/Student";

const studentSchema = new Schema<Student>({
  userName: { type: String, required: true, unique: true, trim: true },
  sid: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  grade: { type: String, required: true, trim: true },
  class: { type: String, required: true, trim: true },
  Email: { type: String, required: true, trim: true },
  absences: { type: Number, required: false, default: 0 }
}, { versionKey: false });

export const studentsModel = model<Student>("students", studentSchema);
