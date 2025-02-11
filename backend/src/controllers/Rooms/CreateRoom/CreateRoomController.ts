import { Request, Response } from "express";
import pool from "../../../configs/database";
import RoomResponseData from "../../../models/Room/RoomResponseData";
import { QueryResult } from "pg";
import RoomData from "../../../models/Room/RoomData";

class CreateRoomController {
  async handle(req: Request, res: Response) {
    const { userId, roomName }: RoomResponseData = req.body;

    const response: QueryResult<RoomData> = await pool.query(
      `insert into rooms(owner_id, room_name) values (${userId}, '${roomName}')`
    );

    const room: QueryResult<RoomData> = await pool.query(
      `select room_name, owner_id, username as owner_name from rooms, users where rooms.room_name = '${roomName}' and rooms.owner_id = ${userId} 
       and owner_id = users.id`
    );

    res.send(room.rows[0]);
  }
}

export { CreateRoomController };
