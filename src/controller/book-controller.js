import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Funcoes que usam autenticar se o usuario existe
async function listarTodosLivros(req, res) {
    try {
        const livros_do_banco = await prisma.books.findMany();
        res.status(200).json(livros_do_banco);
    } catch (error) {
        console.log(error);
    }
}

async function buscarLivroPorId(req, res) {
    const id = parseInt(req.params.id);
    try {
        const livro = await prisma.books.findUnique({
            where: { id: id }
        });
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

async function pegarLivroEmprestado(req, res) {
    const id = parseInt(req.params.id);

    if (!req.body || typeof req.body.available !== "boolean") {
        return res
        .status(400)
        .json({message: "O campo 'available' é obrigatório e deve ser booleano"});
    }

    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido"});
    }

    const { available } = req.body;

    try {

        await prisma.books.update({
            where: { id: id },
            data: {
                available: available
            }
        });
        res.status(200).json({ message: "Livro emprestado com sucesso" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

async function devolverLivro(req, res) {
    const id = parseInt(req.params.id);

    if (!req.body || typeof req.body.available !== "boolean") {
        return res
        .status(400)
        .json({message: "O campo 'available' é obrigatório e deve ser booleano"});
    }

    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido"});
    }

    const { available } = req.body;

    try {

        await prisma.books.update({
            where: { id: id },
            data: {
                available: available
            }
        });
        res.status(200).json({ message: "Devolução realizada com sucesso" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}




//Funcoes que usam o autenticar sem o usuario existir e o typeUser
async function criarLivros (req, res) {
    const { title, author } = req.body;

    if (!title || !author ) {
        return res.status(400).json({ message: "Título e autor do livro são obrigatorios " });
    }

    try {
        await prisma.books.create({
            data: {
                title: title,
                author: author,
            }
        });
        res.status(201).json({ message: "Livro criado com sucesso" , book: { title, author } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar livro" });
    }
};

//atulizar livro
async function atualizarLivro (req, res) {
    const id = parseInt(req.params.id);
    const { title , author, available } = req.body;

    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido"});
    }

    try {
        const livroAtualizado = await prisma.books.update({
            where: { id: id },
            data: {
                title: title,
                author: author,
                available: available
            }
        });

        res.status(200).json({ message: "Livro atualizado com sucesso", book: livroAtualizado });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao atualizar livro" });
    }
};

//deletar livro
async function deletarLivro (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido"});
    }
    try {
        await prisma.books.delete({
            where: { id: id }
        });
        res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao deletar livro" });
    }
};

export { listarTodosLivros, buscarLivroPorId, pegarLivroEmprestado, devolverLivro, criarLivros, atualizarLivro, deletarLivro };