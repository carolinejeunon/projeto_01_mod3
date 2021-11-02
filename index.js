const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({message:"Bem vindo à API"});
});

const filmesRouter = require("./filmes");
app.use("/filmes",filmesRouter);

const timesRouter = require("./times");
app.use("/times",timesRouter);

const cursosRouter = require("./cursos");
app.use("/cursos",cursosRouter);

app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`);
});