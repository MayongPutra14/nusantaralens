import pool from '../config/database.config.js';

export const saveChatHistory = async ({
  sessionId,
  userQuery,
  aiResponse,
  photoUrl,
}) => {
  const query = {
    text: `
    INSERT INTO ai_chats
    (session_id, user_query, ai_response, photo_url, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING id, session_id, user_query, ai_response, photo_url, created_at
    `,
    values: [sessionId, userQuery, aiResponse, photoUrl],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getChatHistoryBySession = async (sessionId) => {
  const query = {
    text: `
      SELECT user_query, ai_response
      FROM ai_chats
      WHERE session_id = $1
      ORDER BY created_at ASC
      LIMIT 3
    `,
    values: [sessionId],
  };

  const result = await pool.query(query);
  return result.rows;
};
