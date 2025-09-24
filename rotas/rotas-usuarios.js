import { Router } from "express";
import {} from "../controller/usuarios-controller.js";
import { verifyUser } from "../middlewares/auth.js";

const roteador = Router();
    
roteador.get("/", (req, res) => {
    (req, res);
});

roteador.get("/:id", (req,res) => {
    (req, res);
});

roteador.post("/", (req, res) => {
    (req, res);
});

roteador.delete("/:id", (req, res) => {
    (req, res);
});

roteador.patch("/:id", (req, res) => {
    (req, res);
});


export default roteador;