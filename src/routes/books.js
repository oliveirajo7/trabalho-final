import Router from "express";

import { 
    listarTodosLivros, buscarLivroPorId, pegarLivroEmprestado, devolverLivro, criarLivros, atualizarLivro, deletarLivro
} from "../controller/books-controller.js";

import { verifyUser } from "../middlewares/auth.js";
import { verifyTypeUser } from "../middlewares/admin.js";

const bookRoute = Router();

bookRoute.get("/", verifyUser, (req, res) => {
    listarTodosLivros(req, res);
});
bookRoute.get("/:id", verifyUser, (req, res) => {
    buscarLivroPorId(req, res);
});

bookRoute.post("/:id/borrow", verifyUser, (req,res) => {
    pegarLivroEmprestado(req, res);
});

bookRoute.post("/:id/return", verifyUser, (req, res) => {
    devolverLivro(req, res);
});

bookRoute.post("/", verifyTypeUser, (req, res) => {
    criarLivros(req, res);
});

bookRoute.patch("/:id", verifyTypeUser, (req, res) => {
    atualizarLivro(req, res);
});

bookRoute.delete("/:id", verifyTypeUser, (req, res) => {
    deletarLivro(req, res);
});


export default bookRoute;