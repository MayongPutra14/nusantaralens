/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('land_areas', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },

    island_id: {
      type: 'INTEGER',
      notNull: true,
      references: 'islands(id)',
      onDelete: 'CASCADE',
    },

    year: {
      type: 'INTEGER',
      notNull: true,
    },

    land_area_km2: {
      type: 'NUMERIC(15,2)',
      notNull: true,
    },

    land_area_percentage: {
      type: 'NUMERIC(5,2)',
      notNull: true,
    },

    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },

    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
  pgm.addConstraint(
    'land_areas',
    'unique_land_area_per_year',
    'UNIQUE(island_id, year)',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('land_areas');
};
