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
  pgm.addColumn('populations', {
    island_id: {
      type: 'INTEGER',
      references: 'islands(id)',
      onDelete: 'CASCADE',
      notNull: true,
    },
  });

  pgm.dropColumns('populations', ['slug', 'region']);

  pgm.addConstraint('populations', 'unique_population_island_year', {
    unique: ['island_id', 'year'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint('populations', 'unique_population_island_year');

  pgm.addColumns('populations', {
    slug: {
      type: 'VARCHAR(150)',
    },

    region: {
      type: 'VARCHAR(100)',
    },
  });

  pgm.dropColumn('populations', 'island_id');
};
