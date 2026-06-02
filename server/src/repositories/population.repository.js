import pool from '../config/database.config.js';

export const upsertPopulation = async ({
  islandId,
  year,
  malePopulation,
  femalePopulation,
  totalPopulation,
}) => {
  const query = {
    text: `
    INSERT INTO populations (
        island_id,
        year,
        male_population,
        female_population,
        total_population
    )
    VALUES ($1, $2, $3, $4, $5)

    ON CONFLICT (island_id, year)

    DO UPDATE SET
        male_population = EXCLUDED.male_population,
        female_population = EXCLUDED.female_population,
        total_population = EXCLUDED.total_population,
        updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `,
    values: [islandId, year, malePopulation, femalePopulation, totalPopulation],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const findPopulationByIslandId = async (islandId) => {
  const query = {
    text: `
      SELECT
        year,
        male_population,
        female_population,
        total_population
      FROM populations
      WHERE island_id = $1
      ORDER BY year ASC
    `,
    values: [islandId],
  };

  const result = await pool.query(query);
  return result.rows;
};
