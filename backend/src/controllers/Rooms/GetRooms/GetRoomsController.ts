import { Request, Response } from "express";
import pool from "../../../configs/database";
import { QueryResult } from "pg";
import RoomData from "../../../models/Room/RoomData";

class GetRoomsController {
  async handle(req: Request, res: Response) {
    const response: QueryResult<RoomData> = await pool.query(
      "select owner_id, room_name, username as owner_name from rooms, users where owner_id = users.id"
    );

    res.send(response.rows);
  }
}

export { GetRoomsController };
