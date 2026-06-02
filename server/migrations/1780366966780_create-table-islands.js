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
  pgm.createTable('islands', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },

    slug: {
      type: 'VARCHAR(150)',
      notNull: true,
      unique: true,
    },

    name: {
      type: 'VARCHAR(150)',
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
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('islands');
};
