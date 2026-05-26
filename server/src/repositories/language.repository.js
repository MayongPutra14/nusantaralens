import pool from '../config/database.config.js';

export const findLanguageByIsoCode = async (isoCode) => {
  const query = {
    text: `
      SELECT 
        l.name, 
        json_agg(
          json_build_object(
            'indonesia', w.lemma,
            'daerah', t.translation
          ) ORDER BY w.lemma ASC
        ) AS words_list
      FROM languages l
      JOIN translations t ON l.id = t.language_id
      JOIN words w ON w.id = t.word_id
      WHERE l.iso_code = $1
      GROUP BY l.id, l.name;
    `,
    values: [isoCode],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
