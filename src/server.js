import express from "express";

//Importando rotas
import authRoute from "./routes/auth.js";
import bookRoute from "./routes/books.js";

const app = express();
app.use(express.json());

// Definindo rotas
app.use("/auth", authRoute);
app.use("/books", bookRoute);

app.listen(3000)