import {Request, Response} from "express";
import pool from "../../../configs/database";
import RoomResponseData from "../../../models/Room/RoomResponseData";
import { QueryResult } from "pg";
import RoomData from "../../../models/Room/RoomData";

class CreateRoomController {
    async handle(req: Request, res: Response) {
        const { userId, roomName }: RoomResponseData = req.body;

        const response: QueryResult<RoomData> = await pool.query(`insert into rooms(owner_id, room_name) values (${userId}, '${roomName}')`);

        res.send(response.rows);
    };
}

export {CreateRoomController}