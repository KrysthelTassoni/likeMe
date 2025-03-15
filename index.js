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


// ✅ Ruta PUT para dar Like a un post

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Obtiene el post actual desde la base de datos
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Incrementa el contador de likes
    const newLikes = post.likes + 1;

    // Actualiza el contador de likes en la base de datos
    const updatedPost = await postModel.updateLikes(id, newLikes);

    res.json(updatedPost);
  } catch (error) {
    console.error("Error al actualizar los likes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ✅ Ruta DELETE para eliminar un post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await postModel.deletePost(id);
    res.json({ message: "Post eliminado con éxito", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
