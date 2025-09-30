import { Router } from "express";
import { criarUsuario } from "../controller/user-controller.js";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    criarUsuario(req, res);
});

export default authRouter;