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
  pgm.createTable('ai-chats', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },

    session_id: {
      type: 'VARCHAR(255)',
      notNull: true,
    },

    user_query: {
      type: 'TEXT',
      notNull: true,
    },

    ai_response: {
      type: 'TEXT',
      notNull: true,
    },

    image_url: {
      type: 'TEXT',
      notNull: false,
    },

    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  pgm.createIndex('ai-chats', 'session_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('ai-chats');
};
