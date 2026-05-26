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
  pgm.createTable('populations', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    slug: {
      type: 'VARCHAR(150)',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    region: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    male_population: {
      type: 'DECIMAL',
      notNull: true,
    },
    female_population: {
      type: 'DECIMAL',
      notNull: true,
    },
    total_population: {
      type: 'DECIMAL',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  pgm.addConstraint('populations', 'unique_population_slug_year', {
    unique: ['slug', 'year'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('populations');
};
