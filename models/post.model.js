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

  // Función para obtener un post por su ID
const findById = async (id) => {
  try {
    const query = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Retorna el primer post encontrado
  } catch (error) {
    console.error("Error al obtener el post por ID:", error);
    throw error;
  }
};

  
  // ✅ Nueva función para actualizar los likes de un post
  const updateLikes = async (id, likes) => {
    try {
      const query = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *";
      const { rows } = await pool.query(query, [likes, id]);
  
      if (rows.length === 0) {
        throw new Error("No se encontró un post con el ID proporcionado");
      }
  
      return rows[0];
    } catch (error) {
      console.error("Error al actualizar los likes:", error);
      throw error;
    }
  };
  
  
  // ✅ Nueva función para eliminar un post
  const deletePost = async (id) => {
    try {
      const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);
  
      if (rows.length === 0) {
        throw new Error(`No se encontró un post con el ID ${id}`);
      }
  
      return rows[0]; 
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  };
  
  // Exporta todas las funciones
  export const postModel = {
    findAll,
    create,
    findById,
    updateLikes,
    deletePost
  };