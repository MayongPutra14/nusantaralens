import {
  generateExplanation,
  predictImage,
  uploadImageToCloudinary,
} from '../services/ai.service.js';
import crypto from 'node:crypto';

export const predict = async (req, res, next) => {
  try {
    const file = req.file;
    const { sessionId, prompt } = req.body;

    if (!file) {
      const error = new Error('Image is required');
      error.status = 400;
      throw error;
    }

    const uploadedImage = await uploadImageToCloudinary(file);
    const photoUrl = uploadedImage.secure_url;

    const prediction = await predictImage(file);
    const label = prediction.label;
    const result = await generateExplanation({
      sessionId: sessionId || crypto.randomUUID(),
      label,
      prompt,
      photoUrl,
    });

    res.status(200).json({
      status: 'success',
      message: 'AI response generated successfully',
      data: {
        prediction: label,
        confidence: prediction.confidence,
        explanation: result.aiResponse,
        photoUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
