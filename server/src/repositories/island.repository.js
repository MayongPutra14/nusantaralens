import pool from '../config/database.config.js';

export const findIslandBySlug = async (slug) => {
  const query = {
    text: `
      SELECT * FROM islands
      WHERE slug = $1
    `,
    values: [slug],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
