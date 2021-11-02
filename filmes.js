const express = require("express");
const router = express.Router();

const filmes = [];

function verificaSeEstaCadastrado(filme, res){
  
    if (!filme) {
      res.status(204).json();
      return true;
    };
    return false;
};

function verificaSeFaltaParametro(filme, res){
    if(!filme.nome){
        res.status(400).json({message:"Nome na requisição está vazio"});
        return true;
    };

    if(!filme.diretor){
        res.status(400).json({message:"Diretor na requisição está vazio"});
        return true;
    };

    if(!filme.genero){
        res.status(400).json({message:"Gênero na requisição está vazio"});
        return true;
    };

    if(!filme.lancamento){
        res.status(400).json({message:"Lançamento na requisição está vazio"});
        return true;
    };

    return false;
}

router.get("/", (req,res) => {
    res.status(200).json({message:"Filmes ok"});
});

router.get("/listar", (req, res) => {
    res.status(200).json(filmes);
});

router.get("/listar/:id", (req, res) => {
    const id = req.params.id;
    const filme = filmes[id];

    if (verificaSeEstaCadastrado(filme, res)){
        return
    };

  
    res.status(200).json(filme);
});

router.post("/", (req, res) => {
    const filme = req.body;

    if (verificaSeFaltaParametro(filme, res)){
        return
    };
  
    filmes.push(filme);
  
    res.status(201).json({mesage: "Cadastro realizado com sucesso!"});
});

router.put("/:id", (req, res) => {
    const id = req.params.id;

    if (verificaSeEstaCadastrado(filmes[id], res) || verificaSeFaltaParametro(req.body, res)){
        return;
    };
  
    filmes[id] = req.body;
  
    res.status(200).json(filmes[id]);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    delete filmes[id];
  
    res.status(200).json(filmes);
});

router.delete("/deletar/:id", (req,res) => {
    const id = req.params.id;
    filmes.splice(id,1);
    res.json(filmes);
});

module.exports = router;