import { prisma } from "../prisma/client.js";

const prisma = new PrismaClient();

async function criarUsuario (req, res) {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password || typeof isAdmin !== "boolean") {
        return res.status(400).json({ message: "Nome, email, senha e tipo do usuario são obrigatórios " });
    }

    try {
        await prisma.users.create({
            data: {
                name: name,
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

export { criarUsuario };