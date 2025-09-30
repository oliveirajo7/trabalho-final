import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyUser(req,res,next) {
    console.log("Passei no middleware")

    const auth = req.headers.authorization;
    
    if (!auth) {
        return res.status(401).json({ message: "Authorization não enviado" });
    }

    // Verificando tipo do token
    if (!auth.startsWith("Basic")) {
        return res.status(400).json({message: "Token precisa ser Basic"})
    }

    // Se existe, preciso pegar o conteudo do token
    const conteudo_do_token = auth.split(" ")[1];
    console.log(conteudo_do_token);

    // Descriptografar o conteúdo do token
    const token_descriptografado = Buffer.from(
        conteudo_do_token,
        "base64"
    ).toString()

    // Tendo usuario e senha, preciso verificar se ele existe no banco
    const [username, password] = token_descriptografado.split(":");

    
    // se nao existe, nao pode acessar
    try {
            const user = await prisma.user.findUnique({ where: { username: username } });

            if (!user) {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: "Senha incorreta" });
            }

            req.user = user; // guarda o usuário logado no request
           next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    
};