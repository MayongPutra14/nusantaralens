/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('heroes', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
      unique: true,
    },
    ascencionDocumentNumber: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    ascencionDocumentDate: {
      type: 'TEXT',
      notNull: false,
    },
    ascencionYear: {
      type: 'integer',
      notNull: false,
    },
    photoUrl: {
      type: 'TEXT',
    },
    birthDate: {
      type: 'TEXT',
      notNull: false,
    },
    birthPlace: {
      type: 'VARCHAR(255)',
      notNull: false,
    },
    deathDate: {
      type: 'TEXT',
      notNull: false,
    },
    deathPlace: {
      type: 'VARCHAR(255)',
      notNull: false,
    },
    burialPlace: {
      type: 'VARCHAR(255)',
      notNull: false,
    },
    description: {
      type: 'TEXT',
      default: 'Tidak ada deskripsi',
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
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('heroes');
};
