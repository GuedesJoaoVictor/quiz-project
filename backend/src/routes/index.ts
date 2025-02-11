import { NextFunction, Request, Response, Router } from "express";
import { RegisterController } from "../controllers/Register/RegisterController";
import { LoginController } from "../controllers/Login/LoginController";
import { LogoutController } from "../controllers/Logout/LogoutController";
import { CreateRoomController } from "../controllers/Rooms/CreateRoom/CreateRoomController";
import { GetRoomsController } from "../controllers/Rooms/GetRooms/GetRoomsController";

export class Routes {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    const isAuthenticated = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({ success: false, message: "Unauthorized" });
    };

    this.router.post("/register", (req: Request, res: Response) => {
      try {
        return new RegisterController().handle(req, res);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error: " + error);
      }
    });
    this.router.post("/login", (req: Request, res: Response) => {
      return new LoginController().handle(req, res);
    });
    this.router.get("/", isAuthenticated, (req: Request, res: Response) => {
      if (req.isAuthenticated()) {
        res.status(200).json({ success: true, user: req.user });
        return;
      }
      res.status(401).json({ success: true, user: req.user });
    });
    this.router.get(
      "/logout",
      (req: Request, res: Response, next: NextFunction) => {
        return new LogoutController().handle(req, res, next);
      }
    );
    this.router.post("/rooms/create", (req: Request, res: Response) => {
      try {
        return new CreateRoomController().handle(req, res);
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
      }
    });
    this.router.get("/rooms/all", (req: Request, res: Response) => {
      try {
        return new GetRoomsController().handle(req, res);
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
      }
    });
  }

  get routes() {
    return this.router;
  }
}

export default Routes;
