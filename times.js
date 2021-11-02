const express = require("express");
const router = express.Router();

const times = [];

router.get("/", (req, res) => {
    res.status(200).json({message: "Times ok!"});
});

router.get("/listar", (req, res) => {
    res.status(200).json(times);
});

router.get("/listar/:id", (req, res) => {
    const id = req.params.id-1;
    const time = times[id];
  
    if (!time) {
      res.status(204);
      return;
    }
  
    res.status(200).json(time);
});

router.post("/", (req, res) => {
    const time = req.body;

    
    if(!time.nome){
        res.status(400).json({message:"Nome na requisição está vazio"});
        return;
    };

    if(!time.estado){
        res.status(400).json({message:"Estado na requisição está vazio"});
        return;
    };

    if(!time.cores){
        res.status(400).json({message:"Cores na requisição está vazio"});
        return;
    };

    if(!time.serie){
        res.status(400).json({message:"Série na requisição está vazio"});
        return;
    };
  
    times.push(time);
  
    res.status(201).json({message:"Time cadastrado com sucesso!"});
});

router.put("/:id", (req, res) => {
    const id = req.params.id-1;

    times[id] = req.body;
  
    res.status(200).json(times[id]);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id-1;
  
    delete times[id];
  
    res.status(200).json(times);
});

module.exports = router;