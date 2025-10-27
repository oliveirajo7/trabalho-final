import { PrismaClient } from "@prisma/client";
    
const prisma = new PrismaClient();

async function criarUsuario (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios " });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        });
        res.status(201).json({ message: "Usuário criado com sucesso", id: newUser.id });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};

export { criarUsuario };