import Joi from 'joi';

export const aiAssistantSchema = Joi.object({
  sessionId: Joi.string().required(),
  prompt: Joi.string().allow('').optional(),
});
