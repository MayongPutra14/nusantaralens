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
  pgm.createTable('economic_growths', {
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
    growth_rate: {
      type: 'NUMERIC(5,2)',
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

  pgm.addConstraint(
    'economic_growths',
    'unique_economic_growth_per_year',
    'UNIQUE(island_id, year)',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('economic_growths');
};
