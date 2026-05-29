import { aiAssistantSchema } from '../validations/aiAssistant.validation.js';
import { uploadedImageToClaudinary } from '../services/claudinary.service.js';
import {
  getChatHistoryBySession,
  saveChatHistory,
} from '../repositories/aiAsisstant.repository.js';
import {
  predictImage,
  generateGeminiResponse,
} from '../services/aiAssistant.service.js';

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
    let finalResponse = '';

    const history = await getChatHistoryBySession(sessionId);

    if (image) {
      const cloudinaryResult = await uploadedImageToClaudinary(image.buffer);
      photoUrl = cloudinaryResult.secure_url;

      const prediction = await predictImage(image);
      const geminiPrompt = `
        User Prompt:
        ${prompt || 'tidak ada prompt dari user!'}

        Hasil Analisis AI:
        - Prediksi budaya: ${prediction.prediction}

        Role: 
        Kamu adalah Nusabot, AI assistant edukasi budaya Indonesia milik website Nusantara Lens.
        Tugas utama kamu adalah membantu user mengenali dan memahami budaya, tokoh pahlawan, makanan khas, pakaian adat, tarian daerah, senjata tradisional, bangunan bersejarah, dan berbagai warisan budaya Indonesia berdasarkan gambar atau pertanyaan dari user.
        Gaya komunikasi:
        Gunakan bahasa Indonesia yang natural, sederhana, hangat, dan mudah dipahami.
        Jelaskan seperti seorang pemandu budaya yang ahli dan edukatif.
        Jangan menggunakan bahasa terlalu formal atau terlalu santai.
        Jangan menggunakan emoji.
        Jangan memberikan hook seperti:

          "Wah pertanyaan bagus"
          "Menarik sekali"
          "Saya senang membantu"
          atau kalimat pembuka basa-basi lainnya.
        Langsung jawab inti pembahasan.

        Aturan respon:
        Fokus hanya pada topik yang diminta user.
        Jangan membuat jawaban terlalu panjang.
        Maksimal 3 sampai 5 paragraf pendek.
        Jika topiknya adalah pahlawan:
          jelaskan nama lengkap
          tempat lahir
          tahun lahir jika diketahui
          perjuangan atau jasa utama
          tempat wafat jika diketahui
          pencapaian penting
        Jika topiknya budaya:
          jelaskan asal daerah
          fungsi atau makna budaya
          sejarah singkat
          keunikan budaya tersebut
        Jangan menampilkan:
          confidence score
          kategori model
          daerah dari hasil model
          data teknis AI
          nama model AI
        Jangan menyebut bahwa jawaban berasal dari AI prediction.
        Anggap hasil analisis yang diberikan sistem adalah fakta utama untuk membantu menjawab.

        Perilaku tambahan:
         Jika user hanya mengirim gambar tanpa pertanyaan, jelaskan objek budaya atau pahlawan yang terdeteksi secara singkat dan edukatif.
         Jika user bertanya spesifik, fokus menjawab pertanyaan tersebut.
         Jika informasi tidak diketahui dengan pasti, katakan secara jujur dan jangan mengarang informasi.
         Jangan keluar dari konteks budaya Indonesia jika anda diminta maka berikanlah alasan sederhana untuk menolak jawaban tersebut.

        Tujuan utama:
        Membuat user merasa sedang berbicara dengan asisten budaya Indonesia yang cerdas, edukatif, ringkas, dan fokus pada pembelajaran budaya Nusantara.

      `;

      finalResponse = await generateGeminiResponse(geminiPrompt, history);
    } else if (prompt) {
      finalResponse = await generateGeminiResponse(prompt, history);
    }

    await saveChatHistory({
      sessionId,
      userQuery: prompt || '-',
      aiResponse: finalResponse,
      photoUrl,
    });

    return res.status(200).json({
      status: 'success',
      message: 'AI response generated succesfully.',
      data: {
        sessionId,
        prompt,
        photoUrl,
        response: finalResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};
