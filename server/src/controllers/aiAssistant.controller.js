import { aiAssistantSchema } from '../validations/aiAssistant.validation.js';
import { handleChatAssistant } from '../services/aiAssistant.service.js';

export const chatAiAssistant = async (req, res, next) => {
  try {
    const { error } = aiAssistantSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.details[0].message,
      });
    }

    const { sessionId, prompt } = req.body;
    const image = req.file;

    if (!prompt && !image) {
      return res.status(400).json({
        status: 'failed',
        message: 'Prompt or image is required',
      });
    }

    const chatResult = await handleChatAssistant({ sessionId, prompt, image });

    return res.status(200).json({
      status: 'success',
      message: 'AI response generated succesfully.',
      data: chatResult,
    });
  } catch (error) {
    next(error);
  }
};
