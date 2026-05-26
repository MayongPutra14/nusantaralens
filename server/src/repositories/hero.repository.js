import pool from '../config/database.config.js';

export const findAllHeroes = async () => {
  const query = {
    text: `
    SELECT 
      id,
      name,
      ascencion_document_number,
      ascencion_document_date,
      ascencion_year,
      photo_url,
      birth_date,
      birth_place,
      death_date,
      death_place,
      burial_place,
      description
    FROM heroes;
`,
  };

  const result = await pool.query(query);
  return result.rows;
};
