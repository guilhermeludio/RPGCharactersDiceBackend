import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Permite requisições de diferentes origens (como seu frontend React)

// Caminho do arquivo JSON
const JSON_FILE_PATH = "./data.json";

// Rota para obter os dados do arquivo JSON
app.get("/data", (req, res) => {
  fs.readFile(JSON_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      res.status(500).send("Erro ao ler o arquivo JSON.");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Rota para salvar dados no arquivo JSON
app.post("/data", (req, res) => {
  const newData = req.body;
    console.log(newData);
  fs.writeFile(JSON_FILE_PATH, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar o arquivo JSON:", err);
      res.status(500).send("Erro ao salvar o arquivo JSON.");
    } else {
      res.send("Dados salvos com sucesso!");
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
