import {NextFunction, Request, Response} from "express";

class LogoutController {
    async handle(req: Request, res: Response, next: NextFunction) {
        req.logout((err) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            req.session.destroy((sessionErr) => {
                if (sessionErr) {
                    console.error("Error destroying session:", sessionErr);
                    return res.status(500).json({ success: false, message: "Error destroying session" });
                }

                res.clearCookie("connect.sid", { path: "/" });
                return res.status(200).json({ success: true, message: "Logged out" });
            });
        });
    }
}

export {LogoutController};