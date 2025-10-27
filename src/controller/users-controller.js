import { PrismaClient } from "@prisma/client";
    
const prisma = new PrismaClient();

async function criarUsuario (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios " });
    }

    if (password.length < 4) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 4 caracteres" });
      }
      

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username },
          });
      
        if (existingUser) {
            return res.status(400).json({ message: "Esse nome de usuário já está em uso" });
        }

        const userCount = await prisma.user.count();
        const isFirstUser = userCount === 0;

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                isAdmin: isFirstUser
            }
        });

        const message = isFirstUser 
            ? "Primeiro usuário criado com sucesso e é um admin" 
            : "Usuário criado com sucesso";

        res.status(201).json({ 
            message: message, 
            id: newUser.id,
            isAdmin: newUser.isAdmin
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
};

export { criarUsuario };