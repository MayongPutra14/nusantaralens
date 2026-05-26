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
  pgm.renameColumn('languages', 'isoCode', 'iso_code');

  pgm.renameColumn('languages', 'createdAt', 'created_at');

  pgm.renameColumn('languages', 'updatedAt', 'updated_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.renameColumn('languages', 'iso_code', 'isoCode');

  pgm.renameColumn('languages', 'created_at', 'createdAt');

  pgm.renameColumn('languages', 'updated_at', 'updatedAt');
};
