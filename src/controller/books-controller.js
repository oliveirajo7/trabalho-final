import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Funcoes que usam autenticar se o usuario existe
export async function listarTodosLivros(req, res) {
    try {
        const livros_do_banco = await prisma.books.findMany();
        res.status(200).json(livros_do_banco);
    } catch (error) {
        res.status(500).json({ message: "Erro listar todos os livros", error});
    }
}

export async function buscarLivroPorId(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido, deve ser um número"});
    }

    try {
        const livro = await prisma.books.findUnique({
            where: { id: id }
        });
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({ message: "Erro buscar livro por id", error });
    }
}

export async function pegarLivroEmprestado(req, res) {
    const id = parseInt(req.params.id);
    
    const { available } = req.body;

   if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido, deve ser um número"});
    }

    if (!req.body || typeof req.body.available !== "boolean" || req.body.available === true) {
        return res
        .status(400)
        .json({message: "O campo 'available' é obrigatório, deve ser booleano e false para emprestar"});
    }

    try {

        const livro = await prisma.books.findUnique({ where: { id } });

        if (!livro) {
          return res.status(404).json({ message: "Livro não existe" });
        }
    
        if (livro.available === false) {
          return res
            .status(400)
            .json({ message: "Esse livro já está emprestado" });
        }

        await prisma.books.update({
            where: { id }, 
            data: {
                available: available
            }
        });
        res.status(200).json({ message: "Livro emprestado com sucesso" });

    } catch (error) {
        res.status(500).json({ message: "Erro pegar livro emprestado", error });
    }
}

export async function devolverLivro(req, res) {
    const id = parseInt(req.params.id);
    const { available } = req.body;

    if (!req.body || typeof req.body.available !== "boolean" || req.body.available === false) {
        return res
        .status(400)
        .json({message: "O campo 'available' é obrigatório, deve ser booleano e true para devolver"});
    }

    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido, deve ser um número"});
    }

    try {

        const livro = await prisma.books.findUnique({ where: { id } });

        if (!livro) {
          return res.status(404).json({ message: "Livro não existe" });
        }
     
        await prisma.books.update({
            where: { id },
            data: {
                available: available
            }
        });
        res.status(200).json({ message: "Devolução realizada com sucesso" });

    } catch (error) {
        res.status(500).json({ message: "Erro devolver livro", error });
    }
}


export async function criarLivros (req, res) {
    const { title, author } = req.body;

    if (!title || !author ) {
        return res.status(400).json({ message: "Título e autor do livro são obrigatorios " });
    }

    try {
        const newBook = await prisma.books.create({
            data: {
                title: title,
                author: author,
            }
        });
        return res.status(201).json({ message: "Livro criado com sucesso" , newBook });
    } catch (error) {
        return res.status(500).json({ message: "Erro criar livro", error });
    }
};

//atulizar livro
export async function atualizarLivro (req, res) {
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
        res.status(500).json({ message: "Erro atualizar livro", error });
    }
};


export async function deletarLivro (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        return res
        .status(400)
        .json({message: "ID inválido, deve ser um número"});
    }
    try {
        await prisma.books.delete({
            where: { id: id }
        });
        res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro deletar livro", error });
    }
};