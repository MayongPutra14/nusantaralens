import {
  fetchLanguageByIsoCode,
  fetchAllIsoCode,
} from '../services/language.service.js';

export const getLanguageByIsoCode = async (req, res, next) => {
  const { isoCode } = req.params;

  try {
    const words = await fetchLanguageByIsoCode(isoCode);

    res.status(200).json({
      status: 'success',
      message: `Get ${words.name} language successfully`,
      data: {
        words: words.words_list,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllIsoCode = async (req, res, next) => {
  try {
    const result = await fetchAllIsoCode();

    res.status(200).json({
      status: 'success',
      message: `Retrieved all ISO codes successfully`,
      data: {
        iso_codes: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
