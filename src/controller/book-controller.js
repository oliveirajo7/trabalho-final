import { prisma } from "../prisma/client.js";

const prisma = new PrismaClient();

async function listarLivros(req, res) {
    try {
        const livros_do_banco = await prisma.books.findMany();
        res.status(200).json(livros_do_banco);
    } catch (error) {
        console.log(error);
    }
}

async function criarLivros (req, res) {
    const { tittle, author } = req.body;

    if (!tittle || !author ) {
        return res.status(400).json({ message: "Título e autor do livro são obrigatorios " });
    }

    try {
        await prisma.books.create({
            data: {
                tittle: tittle,
                author: author,
            }
        });
        res.status(201).json({ message: "Livro criado com sucesso" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar livro" });
    }
};

export { listarLivros, criarLivros} 