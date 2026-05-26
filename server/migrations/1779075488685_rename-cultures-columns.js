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
  pgm.renameColumn('cultures', 'photoUrl', 'photo_url');

  pgm.renameColumn('cultures', 'createdAt', 'created_at');

  pgm.renameColumn('cultures', 'updatedAt', 'updated_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.renameColumn('cultures', 'photo_url', 'photoUrl');

  pgm.renameColumn('cultures', 'created_at', 'createdAt');

  pgm.renameColumn('cultures', 'updated_at', 'updatedAt');
};
