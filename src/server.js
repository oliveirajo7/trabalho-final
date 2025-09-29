import express from "express";
import userRoute from "./routes/user.js";
import bookRoute from "./routes/books.js";
import verifyUser from "./middleware/verify-user.js";

const app = express();
app.use(express.json());

// Rotas
app.use("/users", verifyUser, userRoute);
app.use("/books", verifyUser, bookRoute);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});