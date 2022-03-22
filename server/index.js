const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

// Middlewares
app.use(cors());
app.use(express.json());

// setar img pro server, no banco de dados, colocar o caminho da imagem, por exemplo: Carro.png
app.use(express.static('images'))


// get Veiculos
app.get("/veiculos", async(req,res) => {
    try {
        const veiculos = await pool.query("SELECT * FROM veiculos");
        res.json(veiculos.rows)        
    } catch (err) {
        console.error(err.message)
    }
})

// get Tipos
app.get("/tipos", async(req,res) => {
    try {
        const veiculos = await pool.query("SELECT * FROM TIPOS");
        res.json(veiculos.rows)        
    } catch (err) {
        console.error(err.message)
    }
})


// get Veiculos por id
app.get("/veiculos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const veiculo = await pool.query("SELECT * FROM veiculos where veiculo_id = $1", [id]);
        res.json(veiculo.rows[0])        
    } catch (err) {
        console.error(err.message)
    }
})

//Porta
app.listen(5000, ()=>{
    console.log("server rodando na portta 5000")
})