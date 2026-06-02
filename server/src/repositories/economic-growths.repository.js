import pool from '../config/database.config.js';

export const upsertEconomicGrowth = async ({ islandId, year, growthrate }) => {
  const query = {
    text: `
    INSERT INTO economic_growths (
      island_id,
      year,
      growth_rate
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (island_id, year)
    DO UPDATE SET
      growth_rate = EXCLUDED.growth_rate,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
    `,
    values: [islandId, year, growthrate],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const findEconomicGrowthsByIslandId = async (islandId) => {
  const query = {
    text: `
    SELECT
      year,
      growth_rate
    FROM economic_growths
    WHERE island_id = $1
    ORDER BY year ASC
    `,
    values: [islandId],
  };

  const result = await pool.query(query);
  return result.rows;
};
