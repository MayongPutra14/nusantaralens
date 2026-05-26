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
  pgm.addConstraint('languages', 'unique_iso_code', 'UNIQUE(iso_code)');

  pgm.addConstraint('words', 'unique_lemma', 'UNIQUE(lemma)');

  pgm.addConstraint(
    'translations',
    'unique_translation',
    'UNIQUE(language_id, word_id, translation)',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint('languages', 'unique_iso_code');

  pgm.dropConstraint('words', 'unique_lemma');

  pgm.dropConstraint('translations', 'unique_translation');
};
