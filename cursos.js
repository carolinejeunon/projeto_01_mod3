const express = require("express");
const router = express.Router();

const cursos = [];

router.get("/", (req, res) => {
    res.status(200).json({message: "Cursos ok!"});
});

router.get("/listar", (req, res) => {
    res.status(200).json(cursos);
});

router.get("/listar/:id", (req, res) => {
    const id = req.params.id-1;
    const curso = cursos[id];
  
    if (!curso) {
      res.status(204);
      return;
    }
  
    res.status(200).json(curso);
});

router.post("/", (req, res) => {
    const curso = req.body;

    
    if(!curso.nome){
        res.status(400).json({message:"Nome na requisição está vazio"});
        return;
    };

    if(!curso.duracao){
        res.status(400).json({message:"Duração na requisição está vazio"});
        return;
    };

    if(!curso.numeroMaterias){
        res.status(400).json({message:"Número de matérias na requisição está vazio"});
        return;
    };

    if(!curso.horario){
        res.status(400).json({message:"Horário na requisição está vazio"});
        return;
    };
  
    cursos.push(curso);
  
    res.status(201).json({message:"Curso cadastrado com sucesso!"});
});

router.put("/:id", (req, res) => {
    const id = req.params.id-1;

    cursos[id] = req.body;
  
    res.status(200).json(cursos[id]);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id-1;
  
    delete cursos[id];
  
    res.status(200).json(cursos);
});

module.exports = router;