import { pool } from "../database/connection.js";

// Obtener todos los posts
const findAll = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;  // Devuelve todos los posts
  } catch (error) {
    console.error("Error al obtener todos los registros:", error);
    throw error; // Relanza el error para que el controlador lo maneje
  }
};


// Crear un nuevo post
const create = async (post) => {
    try {
      const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
      const { rows } = await pool.query(query, [post.titulo, post.url, post.descripcion, 0]); // Se usa post.url en lugar de post.img y se inicializa likes en 0
      return rows[0];  
    } catch (error) {
      console.error("Error al crear un nuevo post:", error);
      throw error;
    }
  };
  

// Exporta las funciones para que las utilices en otras partes de la aplicación
export const postModel = {
  findAll,
  create,
};
