import pool from '../config/database.config.js';

export const findAllCultures = async () => {
  const query = {
    text: `
      SELECT
        id,
        name,
        photo_url,
        description
      FROM cultures
    `,
  };

  const result = await pool.query(query);
  return result.rows;
};
