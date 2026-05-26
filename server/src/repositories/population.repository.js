import pool from '../config/database.config.js';

export const upsertPopulation = async ({
  slug,
  year,
  region,
  malePopulation,
  femalePopulation,
  totalPopulation,
}) => {
  const query = {
    text: `
    INSERT INTO populations (
        slug,
        year,
        region,
        male_population,
        female_population,
        total_population
    )
    VALUES ($1, $2, $3, $4, $5, $6)

    ON CONFLICT (slug, year)

    DO UPDATE SET
        region = EXCLUDED.region,
        male_population = EXCLUDED.male_population,
        female_population = EXCLUDED.female_population,
        total_population = EXCLUDED.total_population,
        updated_at = CURRENT_TIMESTAMP
    WHERE populations.male_population IS DISTINCT FROM EXCLUDED.male_population
      OR  populations.female_population IS DISTINCT FROM EXCLUDED.female_population
    RETURNING *
  `,
    values: [
      slug,
      year,
      region,
      malePopulation,
      femalePopulation,
      totalPopulation,
    ],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const findIslandById = async (islandId) => {
  const query = {
    text: `
      SELECT * FROM populations WHERE id = $1
      `,
    values: [islandId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
