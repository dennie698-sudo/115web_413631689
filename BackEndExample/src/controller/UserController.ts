import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { Student } from "../interfaces/Student";

export class UserController {
  private service = new UserService();

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const students = await this.service.getAllStudents();
      res.status(200).send({
        code: 200,
        message: "find sucess",
        body: students
      });
    } catch (error) {
      console.error("findAll error:", error);
      res.status(500).send({ code: 500, message: "server error", body: null });
    }
  };

  public insertOne = async (req: Request, res: Response): Promise<void> => {
    const info = req.body as Student;
    const requiredFields: (keyof Student)[] = [
      "userName", "name", "department", "grade", "class", "Email"
    ];

    if (!info || requiredFields.some(field =>
      typeof info[field] !== "string" || !String(info[field]).trim()
    )) {
      res.status(400).send({
        code: 400,
        message: "缺少必要欄位，請提供 userName、name、department、grade、class、Email",
        body: null
      });
      return;
    }

    try {
      const result = await this.service.insertOne(info);
      res.status(result.code).send(result);
    } catch (error) {
      console.error("insertOne error:", error);
      res.status(500).send({ code: 500, message: "server error", body: null });
    }
  };
}
