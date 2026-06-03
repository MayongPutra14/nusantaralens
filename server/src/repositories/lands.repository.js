import pool from '../config/database.config.js';

export const upsertLandAreas = async ({
  islandId,
  year,
  land_area_km,
  land_area_percentage,
}) => {
  const query = {
    text: `
    INSERT INTO land_areas (
      island_id,
      year,
      land_area_km2, 
      land_area_percentage 
    )
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (island_id, year)
    DO UPDATE SET
      land_area_km2 = EXCLUDED.land_area_km2,
      land_area_percentage = EXCLUDED.land_area_percentage,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
    `,
    values: [islandId, year, land_area_km, land_area_percentage],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const findLandAreasByIslandId = async (islandId) => {
  const query = {
    text: `
    SELECT
      year,
      land_area_km2, 
      land_area_percentage
    FROM land_areas
    WHERE island_id = $1
    ORDER BY year ASC
    `,
    values: [islandId],
  };

  const result = await pool.query(query);
  return result.rows;
};
