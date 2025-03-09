import express from "express";
import cors from "cors";
import { postModel } from "./models/post.model.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors()); // <--- Habilitamos CORS

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// ruta Get Posts desde la base de datos
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.findAll(); // Cambiado de todoModel a postModel
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Crear post desde la base de datos
app.post("/posts", async (req, res) => {
    try {
      const { titulo, url, descripcion } = req.body;
      if (!titulo || !url || !descripcion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
  
      const newPost = await postModel.create({ titulo, url, descripcion });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error al crear el post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
