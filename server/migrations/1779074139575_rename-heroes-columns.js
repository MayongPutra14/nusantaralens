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
  pgm.renameColumn(
    'heroes',
    'ascencionDocumentNumber',
    'ascencion_document_number',
  );

  pgm.renameColumn(
    'heroes',
    'ascencionDocumentDate',
    'ascencion_document_date',
  );

  pgm.renameColumn('heroes', 'ascencionYear', 'ascencion_year');

  pgm.renameColumn('heroes', 'photoUrl', 'photo_url');

  pgm.renameColumn('heroes', 'birthDate', 'birth_date');

  pgm.renameColumn('heroes', 'birthPlace', 'birth_place');

  pgm.renameColumn('heroes', 'deathDate', 'death_date');

  pgm.renameColumn('heroes', 'deathPlace', 'death_place');

  pgm.renameColumn('heroes', 'burialPlace', 'burial_place');

  pgm.renameColumn('heroes', 'createdAt', 'created_at');

  pgm.renameColumn('heroes', 'updatedAt', 'updated_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.renameColumn(
    'heroes',
    'ascencion_document_number',
    'ascencionDocumentNumber',
  );

  pgm.renameColumn(
    'heroes',
    'ascencion_document_date',
    'ascencionDocumentDate',
  );

  pgm.renameColumn('heroes', 'ascencion_year', 'ascencionYear');

  pgm.renameColumn('heroes', 'photo_url', 'photoUrl');

  pgm.renameColumn('heroes', 'birth_date', 'birthDate');

  pgm.renameColumn('heroes', 'birth_place', 'birthPlace');

  pgm.renameColumn('heroes', 'death_date', 'deathDate');

  pgm.renameColumn('heroes', 'death_place', 'deathPlace');

  pgm.renameColumn('heroes', 'burial_place', 'burialPlace');

  pgm.renameColumn('heroes', 'created_at', 'createdAt');

  pgm.renameColumn('heroes', 'updated_at', 'updatedAt');
};
