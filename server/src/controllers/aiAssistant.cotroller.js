import { aiAssistantSchema } from '../validations/aiAssistant.validation.js';
import { uploadedImageToClaudinary } from '../services/claudinary.service.js';

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

    let photoUrl = null;

    if (image) {
      const cloudinaryResult = await uploadedImageToClaudinary(image.buffer);
      photoUrl = cloudinaryResult.secure_url;
    }

    return res.status(200).json({
      status: 'success',
      message: 'Request successfully received.',
      data: {
        sessionId,
        prompt,
        photoUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
