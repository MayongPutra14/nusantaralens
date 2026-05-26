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
  pgm.createTable('translations', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    wordId: {
      type: 'INTEGER',
      notNull: true,
      references: '"words"',
      onDelete: 'CASCADE',
    },
    languageId: {
      type: 'INTEGER',
      notNull: true,
      references: '"languages"',
      onDelete: 'CASCADE',
    },
    translation: {
      type: 'TEXT',
      notNull: true,
    },
    createdAt: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('translations', 'wordId');
  pgm.createIndex('translations', 'languageId');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('translations');
};
