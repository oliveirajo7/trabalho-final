import { prisma } from "../prisma/client.js";

const prisma = new PrismaClient();

async function listarTodosUsuarios(req, res) {
    try {
        const usuarios_do_banco = await prisma.users.findMany();
        res.status(200).json(usuarios_do_banco);
    } catch (error) {
        console.log(error)
    }
}

async function criarUsuario (req, res) {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password || typeof isAdmin !== "boolean") {
        return res.status(400).json({ message: "Nome de usuário, email, senha e tipo do usuário são obrigatórios " });
    }

    try {
        await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: password,
                isAdmin: isAdmin
            }
        });
        res.status(201).json({ message: "Usuário criado com sucesso" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

export { criarUsuario, listarTodosUsuarios };