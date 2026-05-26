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
  pgm.renameColumn('translations', 'wordId', 'word_id');

  pgm.renameColumn('translations', 'languageId', 'language_id');

  pgm.renameColumn('translations', 'createdAt', 'created_at');

  pgm.renameColumn('translations', 'updatedAt', 'updated_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.renameColumn('translations', 'word_id', 'wordId');

  pgm.renameColumn('translations', 'language_id', 'languageId');

  pgm.renameColumn('translations', 'created_at', 'createdAt');

  pgm.renameColumn('translations', 'updated_at', 'updatedAt');
};
