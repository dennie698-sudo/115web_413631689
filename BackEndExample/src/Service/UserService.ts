import { Student } from "../interfaces/Student";
import { studentsModel } from "../orm/schemas/studentSchemas";

type UserNameValidation =
  | "學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760"
  | "座號已存在"
  | "校名必須為 tku"
  | "座號格式不正確，必須為四位數字。"
  | "驗證通過";

type SeatInfo = {
  schoolName: string;
  department: string;
  seatNumber: string;
};

export class UserService {
  public async getAllStudents() {
    return studentsModel.find({}).sort({ sid: 1 }).lean();
  }

  public async insertOne(info: Student) {
    const validation = await this.userNameValidator(info.userName);
    if (validation !== "驗證通過") {
      return { code: 403, message: validation, body: null };
    }

    const count = await studentsModel.countDocuments({});
    if (count >= 200) {
      return { code: 403, message: "student list is full", body: null };
    }

    try {
      const student = await studentsModel.create({
        ...info,
        sid: String(count + 1),
        absences: info.absences ?? 0
      });
      return { code: 200, message: "", body: student };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
        return { code: 403, message: "座號已存在", body: null };
      }
      throw error;
    }
  }

  public async userNameValidator(userName: string): Promise<UserNameValidation> {
    if (typeof userName !== "string" || userName.length < 8) {
      return "學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760";
    }

    const info = this.userNameFormator(userName);
    if (info.schoolName !== "tku") return "校名必須為 tku";
    if (!/^\\d{4}$/.test(info.seatNumber)) {
      return "座號格式不正確，必須為四位數字。";
    }
    if (await this.existingSeatNumbers(info.seatNumber)) return "座號已存在";
    return "驗證通過";
  }

  public userNameFormator(userName: string): SeatInfo {
    return {
      schoolName: userName.slice(0, 3),
      department: userName.slice(3, -4),
      seatNumber: userName.slice(-4)
    };
  }

  public async existingSeatNumbers(seatNumber: string): Promise<boolean> {
    const students = await studentsModel.find({}, { userName: 1 }).lean();
    return students.some(student => this.userNameFormator(student.userName).seatNumber === seatNumber);
  }
}
